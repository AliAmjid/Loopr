<?php


namespace App\Extension;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\ContextAwareQueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Subject;
use App\Entity\User;
use App\Enum\AclResourceEnum;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Security;

class UserSecurityExtension implements ContextAwareQueryCollectionExtensionInterface
{
    private Security $security;
    private EntityManager $em;

    public function __construct(
        Security $security,
        ManagerRegistry $registry
    ) {
        $this->security = $security;
        $this->em = $registry->getManager();
    }

    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null,
        array $context = []
    ) {
        //dump($context);
        return;
        // dump($queryBuilder);
        /** @var User $user */
        $user = $this->security->getUser();
        if ($resourceClass === User::class) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            if ($this->security->isGranted(AclResourceEnum::USER_SHOW_ALL)) {
                return;
            } elseif ($this->security->isGranted(AclResourceEnum::SUBJECT_TEACHER)) {
                //all users in group
                $queryBuilder
                    ->innerJoin(sprintf('%s.taughtSubjects', $rootAlias), 'taughtSubjects')
                    ->andWhere('taughtSubjects IN (:subjects)')
                    ->setParameter('subjects', $user->getTaughtSubjects()->toArray());
            } elseif ($this->security->isGranted(AclResourceEnum::USER_CAN_STUDY)) {
                $queryBuilder->where('%s IN (:teachers)')
                    ->setParameter('teachers', $this->getTeachersOfStudent($user)->toArray());
            } else {
                $queryBuilder->andWhere(sprintf('%s.id = :id', $rootAlias))
                    ->setParameter('id', $user->getId());
            }
        }
    }

    private function getTeachersOfStudent(User $user): Collection|array
    {
        return $this->em->createQueryBuilder()
            ->select(['s', 'u'])
            ->from(Subject::class, 's')
            ->innerJoin('s.teacher', 'u')
            ->leftJoin(sprintf('%s.group', 's'), 'group')
            ->leftJoin(sprintf('%s.classGroup', 's'), 'classGroup')
            ->andWhere(':current_user MEMBER OF classGroup.users OR :current_user MEMBER OF group.users')
            ->setParameter('current_user', $this->security->getUser()->getId())
            ->getQuery()
            ->getResult();
    }
}
