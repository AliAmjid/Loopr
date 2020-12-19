<?php


namespace App\Serializer;


use ApiPlatform\Core\Serializer\SerializerContextBuilderInterface;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

final class ResourceContextBuilder implements SerializerContextBuilderInterface
{
    private $decorated;
    private ?User $user;

    public function __construct(
        SerializerContextBuilderInterface $decorated,
        UserInterface $user = null
    ) {
        $this->decorated = $decorated;
        $this->user = $user;
    }

    public function createFromRequest(Request $request, bool $normalization, ?array $extractedAttributes = null): array
    {
        $context = $this->decorated->createFromRequest($request, $normalization, $extractedAttributes);
        $action = $normalization ? 'read' : 'write';
        $context['groups'][] = $action;
        if ($this->user) {
            foreach ($this->user->getRole()->getResources() as $resource) {
                $context['groups'] = $action . ':' . $resource->getName();
            }
        }
        return $context;
    }
}
