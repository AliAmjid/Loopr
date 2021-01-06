<?php


namespace App\DataPersister;


use ApiPlatform\Core\Api\IriConverterInterface;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\SchoolPeriod;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use App\Repository\SchoolPeriodRepository;
use Doctrine\Persistence\ManagerRegistry;

class SchoolPeriodPersister implements ContextAwareDataPersisterInterface
{
    private ContextAwareDataPersisterInterface $decorated;
    private ManagerRegistry $registry;
    private IriConverterInterface $iriConverter;

    public function __construct(
        ContextAwareDataPersisterInterface $decorated,
        ManagerRegistry $registry,
        IriConverterInterface $iriConverter
    ) {
        $this->decorated = $decorated;
        $this->registry = $registry;
        $this->iriConverter = $iriConverter;
    }

    public function supports($data, array $context = []): bool
    {
        return $this->decorated->supports($data, $context);
    }

    public function persist($data, array $context = [])
    {
        if ($data instanceof SchoolPeriod
            && in_array($context['graphql_operation_name'] ?? null, ['create', 'update', 'edit'])
        ) {
            /** @var SchoolPeriodRepository $schoolRepository */
            $schoolRepository = $this->registry->getRepository(SchoolPeriod::class);

            if ($data->getFrom() >= $data->getTo()) {
                throw new ClientError(ClientErrorType::SCHOOL_PERIOD_VALIDATION_ERROR);
            }

            if (count($schoolRepository->findByBetweenFromNTo($data->getTo(), $data->getFrom())) > 0) {
                throw new ClientError(ClientErrorType::SCHOOL_PERIOD_VALIDATION_ERROR);
            }
        }

        return $this->decorated->persist($data, $context);
    }

    public function remove($data, array $context = [])
    {
        return $this->decorated->remove($data, $context);
    }
}
