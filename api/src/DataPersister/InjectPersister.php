<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Annotation\InjectDateTime;
use App\Annotation\InjectLoggedUser;
use App\Entity\User;
use App\Service\AnnotationReaderHelperService;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class InjectPersister implements ContextAwareDataPersisterInterface
{

    private ContextAwareDataPersisterInterface $decorated;
    private AnnotationReaderHelperService $annotationReaderHelperService;
    private User $loggedUser;

    public function __construct(
        ContextAwareDataPersisterInterface $decorated,
        AnnotationReaderHelperService $annotationReaderHelperService,
        TokenStorageInterface $tokenStorage
    ) {
        $this->decorated = $decorated;
        $this->annotationReaderHelperService = $annotationReaderHelperService;
        $this->loggedUser = $tokenStorage->getToken()->getUser();
    }

    public function supports($data, array $context = []): bool
    {
        return $this->decorated->supports($data, $context);
    }

    public function persist($data, array $context = [])
    {
        $this->inject($data, InjectLoggedUser::class, $this->loggedUser, $context);
        $this->inject($data, InjectDateTime::class, new \DateTime(), $context);
        return $this->decorated->persist($data, $context);
    }

    public function remove($data, array $context = [])
    {
        return $this->decorated->remove($data, $context);
    }

    private function inject($data, $annotation, $injectItem, $context)
    {
        foreach (
            $this->annotationReaderHelperService->getMethodsAnnotatedWith(
                get_class($data),
                $annotation
            ) as $item
        ) {
            /** @var \ReflectionMethod $method */
            $method = $item['method'];
            /** @var InjectLoggedUser $annotation */
            $annotation = $item['annotation'];
            foreach ($annotation->operations as $operation) {
                if ($operation === $context['graphql_operation_name']) {
                    $data->{$method->getName()}($injectItem);
                }
            }
        }
    }
}
