<?php


namespace App\Extension;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\ContextAwareQueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Point;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

class PointsExtension implements ContextAwareQueryCollectionExtensionInterface
{
    public function __construct(
        private Security $security
    ) {
    }

    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null,
        array $context = []
    ) {
        if ($resourceClass === Point::class) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere(sprintf("%s.user = :current_user", $rootAlias))
                ->setParameter('current_user', $this->security->getUser()->getId());
        }
    }

}
