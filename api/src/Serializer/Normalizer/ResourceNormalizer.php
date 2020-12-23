<?php

namespace App\Serializer\Normalizer;

use App\Entity\User;
use App\Security\Voter\IsUserTeacherVoter;
use Doctrine\Common\Proxy\Proxy;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class ResourceNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED = 'RESOURCE_NORMALIZER_ALREADY_CALLED';

    private ?User $user;
    private Security $security;
    private ManagerRegistry $managerRegistry;

    public function __construct(
        ObjectNormalizer $normalizer,
        Security $security,
        ManagerRegistry $managerRegistry,
        ?UserInterface $user = null
    ) {
        $this->normalizer = $normalizer;
        $this->user = $user;
        $this->security = $security;
        $this->managerRegistry = $managerRegistry;
    }

    public function normalize($object, string $format = null, array $context = []): array
    {
        $context['groups'] = [];
        $context['groups'][] = 'read:always';

        if ($this->user) {
            foreach ($this->user->getRole()->getResources() as $resource) {
                $context['groups'] = 'read:' . $resource->getName();
            }
        }

        if ($this->security->isGranted('ENTITY_ACCESS', $object)) {
            $context['groups'][] = 'read';
        }

        if ($object instanceof User) {
            if ($this->security->isGranted(IsUserTeacherVoter::IS_USERS_TEACHER, $object)) {
                $context['groups'][] = 'read:usersTeacher';
            }
        }

        $context['groups'] = array_unique($context['groups']);
        $context[self::ALREADY_CALLED] = true;
        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization($data, string $format = null, array $context = []): bool
    {
        if (isset($context[self::ALREADY_CALLED]) || !isset($context['graphql_operation'])) {
            return false;
        }
        return $this->isEntity($this->managerRegistry->getManager(), $data);
    }

    private function isEntity(ObjectManager $em, $class): bool
    {
        if (is_object($class)) {
            $class = ($class instanceof Proxy)
                ? get_parent_class($class)
                : get_class($class);
            return !$em->getMetadataFactory()->isTransient($class);
        }
        return false;
    }
}
