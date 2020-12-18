<?php


namespace App\DataPersister;


use ApiPlatform\Core\Api\IriConverterInterface;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\ClassGroup;
use App\Entity\Group;
use App\Entity\IGroup;
use App\Entity\Subject;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use \Doctrine\Persistence\ManagerRegistry;

class SubjectDataPersister implements ContextAwareDataPersisterInterface
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
        if ($data instanceof Subject
            && in_array($context['graphql_operation_name'] ?? null, ['create', 'update', 'edit'])
        ) {
            $iri = $data->getIGroupIri();
            if ($iri) {
                $iGroup = $this->iriConverter->getItemFromIri($iri, $context);
                if ($iGroup instanceof IGroup) {
                    $data->setIGroup($iGroup);
                } else {
                    throw new ClientError(ClientErrorType::INVALID_IRI);
                }
            }
        }

        return $this->decorated->persist($data, $context);
    }

    public function remove($data, array $context = [])
    {
        return $this->decorated->remove($data, $context);
    }
}
