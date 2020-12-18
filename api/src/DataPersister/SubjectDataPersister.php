<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\ClassGroup;
use App\Entity\Group;
use App\Entity\Subject;
use \Doctrine\Persistence\ManagerRegistry;

class SubjectDataPersister implements ContextAwareDataPersisterInterface
{
    private ContextAwareDataPersisterInterface $decorated;
    private ManagerRegistry $registry;

    public function __construct(
        ContextAwareDataPersisterInterface $decorated,
        ManagerRegistry $registry
    ) {
        $this->decorated = $decorated;
        $this->registry = $registry;
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
                $iri = explode('/', $iri);
                if ($iri[0] === 'groups') {
                    $group = $this->registry->getManager()->find(Group::class, $iri[1]);
                    $data->setGroup($group);
                    $data->setClassGroup(null);
                } elseif ($iri[0] === 'class_groups') {
                    $group = $this->registry->getManager()->find(ClassGroup::class, $iri[1]);
                    $data->setClassGroup($group);
                    $data->setGroup(null);
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
