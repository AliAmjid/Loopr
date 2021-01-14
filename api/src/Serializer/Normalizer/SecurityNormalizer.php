<?php

namespace App\Serializer\Normalizer;

use App\Entity\Subject;
use App\Entity\User;
use App\Entity\UserPrivateData;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use App\Security\Voter\SubjectVoter;
use App\Security\Voter\UserVoter;
use Doctrine\Common\Proxy\Proxy;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class SecurityNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED = 'RESOURCE_NORMALIZER_ALREADY_CALLED';


    private ?User $user;
    private Security $security;
    private ManagerRegistry $managerRegistry;
    private ObjectManager $em;

    public function __construct(
        ObjectNormalizer $normalizer,
        Security $security,
        ManagerRegistry $managerRegistry
    ) {
        $this->normalizer = $normalizer;
        $this->security = $security;
        $this->managerRegistry = $managerRegistry;
        $this->em = $managerRegistry->getManager();
        $this->user = $security->getUser();
    }

    public function normalize($object, string $format = null, array $context = []): array
    {
        $context['groups'] = [];
        $context['groups'][] = 'read:always';

        if ($this->user) {
            foreach ($this->user->getRole()->getResources() as $resource) {
                $context['groups'][] = 'read:' . $resource->getName();
            }
        }

        if ($this->security->isGranted('ENTITY_ACCESS', $object)) {
            $context['groups'][] = 'read';
        } else {
            throw new ClientError(ClientErrorType::CHECK_ACCESS, ['type' => $this->getEntityName($object)]);
        }

        if ($object instanceof User) {
            if ($this->security->isGranted(UserVoter::IS_USERS_TEACHER, $object)) {
                $context['groups'][] = 'read:usersTeacher';
            }

            if ($this->security->isGranted(UserVoter::IS_SAME_USER, $object)) {
                $context['groups'][] = 'read:owner';
            }
        }

        if ($object instanceof Subject) {
            if ($this->security->isGranted(SubjectVoter::IS_SUBJECT_TEACHER, $object)) {
                $context['groups'][] = 'read:teacher';
            }
        }

        if ($object instanceof UserPrivateData) {
            if ($this->security->isGranted(UserVoter::IS_SAME_USER, $object->getUser())) {
                $context['groups'][] = 'read:owner';
            }
        }

        $context['groups'] = array_unique($context['groups']);
        $context['resource_normalizer_call_data'][] = $object->getId();
        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization($data, string $format = null, array $context = []): bool
    {

        if (
            !$this->isEntity($this->managerRegistry->getManager(), $data)
            || !isset($context['graphql_operation_name'])

        ) {
            return false;
        }

        if (
            isset($context['resource_normalizer_call_data'])
            && in_array($data->getId(), $context['resource_normalizer_call_data'])
        ) {
            return false;
        }

        return true;
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

    private function getEntityName($object)
    {
        $array = explode('\\', $this->em->getMetadataFactory()->getMetadataFor(get_class($object))->getName());
        return $array[count($array) - 1];
    }
}
