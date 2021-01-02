<?php


namespace App\Extension;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\ContextAwareQueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Exam;
use App\Enum\AclResourceEnum;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

class WrittenExamsExtension implements ContextAwareQueryCollectionExtensionInterface
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
        if ($resourceClass === Exam::class) {
            if ((!$this->security->isGranted(AclResourceEnum::SUBJECT_TEACHER)) || $operationName == 'written') {
                $rootAlias = $queryBuilder->getRootAliases()[0];
                $queryBuilder
                    ->leftJoin(sprintf('%s.pointSystem', $rootAlias), 'pointSystem')
                    ->innerJoin('pointSystem.points', 'points')
                    ->andWhere('points.user = :current_user')
                    ->setParameter('current_user', $this->security->getUser()->getId());
            }
        }
    }

}
