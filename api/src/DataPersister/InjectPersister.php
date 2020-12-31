<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Annotation\InjectDateTime;
use App\Annotation\InjectLoggedUser;
use App\Annotation\InjectSchoolPeriod;
use App\Entity\SchoolPeriod;
use App\Entity\User;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use App\Repository\SchoolPeriodRepository;
use App\Service\AnnotationReaderHelperService;
use Doctrine\Persistence\ManagerRegistry;
use ReflectionClass;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class InjectPersister implements ContextAwareDataPersisterInterface
{

    private ContextAwareDataPersisterInterface $decorated;
    private AnnotationReaderHelperService $annotationReaderHelperService;
    private User $loggedUser;

    public function __construct(
        ContextAwareDataPersisterInterface $decorated,
        AnnotationReaderHelperService $annotationReaderHelperService,
        TokenStorageInterface $tokenStorage,
        private SchoolPeriodRepository $schoolPeriodRepository,
        ManagerRegistry $registry
    ) {
        $this->decorated = $decorated;
        $this->annotationReaderHelperService = $annotationReaderHelperService;
        $this->loggedUser = $tokenStorage->getToken()->getUser();
        $this->schoolPeriodRepository = $registry->getRepository(SchoolPeriod::class);
    }

    public function supports($data, array $context = []): bool
    {
        return $this->decorated->supports($data, $context);
    }

    public function persist($data, array $context = [])
    {
        //todo: php8
        $this->injectViaAnnotation($data, InjectLoggedUser::class, $this->loggedUser, $context);
        $this->injectViaAnnotation($data, InjectDateTime::class, new \DateTime(), $context);

        $this->injectViaAttribute(
            $data,
            InjectSchoolPeriod::class,
            function () {
                return $this->schoolPeriodRepository->findActive()
                    ?? throw new ClientError(ClientErrorType::NO_SCHOOL_PERIOD_ACTIVE);
            },
            $context
        );

        return $this->decorated->persist($data, $context);
    }

    public function remove($data, array $context = [])
    {
        return $this->decorated->remove($data, $context);
    }

    private function injectViaAnnotation($data, $annotation, $injectItem, $context)
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
                    if (is_callable($injectItem)) {
                        $injectItem = call_user_func($injectItem);
                    }
                    $data->{$method->getName()}($injectItem);
                }
            }
        }
    }

    private function injectViaAttribute(object $data, string $attribute, mixed $injectItem, array $context)
    {
        $reflectionClass = new ReflectionClass(get_class($data));
        foreach ($reflectionClass->getMethods() as $method) {
            foreach ($method->getAttributes($attribute) as $attributeRef) {
                /** @var InjectSchoolPeriod $attribute */
                $attribute = $attributeRef->newInstance();
                foreach ($attribute->operations as $operation) {
                    if ($operation === $context['graphql_operation_name']) {
                        if (is_callable($injectItem)) {
                            $injectItem = call_user_func($injectItem);
                        }
                        $data->{$method->getName()}($injectItem);
                    }
                }
            }
        }
    }
}
