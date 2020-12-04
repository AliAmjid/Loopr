<?php

namespace App\Serializer\Normalizer;

use App\Entity\User;
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

    public function __construct(
        ObjectNormalizer $normalizer,
        ?UserInterface $user = null
    ) {
        $this->normalizer = $normalizer;
        $this->user = $user;
    }

    public function normalize($object, string $format = null, array $context = []): array
    {
        $context['groups'] = [];
        $context['groups'][] = 'read';
        if ($this->user) {
            foreach ($this->user->getRole()->getResources() as $resource) {
                $context['groups'] = 'read:' . $resource->getName();
            }
        }
        $context['groups'] = array_unique($context['groups']);
        $context[self::ALREADY_CALLED] = true;

        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization($data, string $format = null, array $context = []): bool
    {
        if (isset($context[self::ALREADY_CALLED])) {
            return false;
        }
        return is_object($data);
    }
}
