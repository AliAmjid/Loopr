<?php


namespace App\Extension;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Subject;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

class LearntSubjectsExtension implements QueryCollectionExtensionInterface
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
        $this->addWhere($queryBuilder, $resourceClass, $operationName);
    }

    private function addWhere(QueryBuilder $qb, string $resourceClass, ?string $operationName)
    {
        return;
        if ($resourceClass === Subject::class && $operationName === 'learnt') {
            $rootAlias = $qb->getRootAliases()[0];
            $qb
                ->leftJoin(sprintf('%s.group', $rootAlias), 'group')
                ->leftJoin(sprintf('%s.classGroup', $rootAlias), 'classGroup')
                ->andWhere(':current_user MEMBER OF classGroup.users OR :current_user MEMBER OF group.users')
                ->setParameter('current_user', $this->security->getUser()->getId());
        }
    }
}
