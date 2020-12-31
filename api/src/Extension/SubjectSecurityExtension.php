<?php


namespace App\Extension;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Subject;
use App\Enum\AclResourceEnum;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

class SubjectSecurityExtension implements QueryCollectionExtensionInterface
{

    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    ) {
        return;
        if ($resourceClass === Subject::class && !$this->security->isGranted(AclResourceEnum::SUBJECT_SHOW_ALL)) {
            $this->addWhere($queryBuilder);
        }
    }

    private function addWhere(QueryBuilder $qb)
    {
        $rootAlias = $qb->getRootAliases()[0];
        $qb
            ->leftJoin(sprintf('%s.group', $rootAlias), 'group')
            ->leftJoin(sprintf('%s.classGroup', $rootAlias), 'classGroup')
            ->andWhere(':current_user MEMBER OF classGroup.users OR :current_user MEMBER OF group.users')
            ->setParameter('current_user', $this->security->getUser()->getId());
    }
}
