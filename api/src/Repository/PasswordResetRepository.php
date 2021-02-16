<?php


namespace App\Repository;


use App\Entity\Notification;
use App\Entity\PasswordReset;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NoResultException;
use Doctrine\Persistence\ManagerRegistry;

class PasswordResetRepository extends ServiceEntityRepository
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PasswordReset::class);
    }

    public function findByKeyAndExpiredAtLowerThanNow(string $key)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('pr')
            ->from(PasswordReset::class, 'pr')
            ->where('pr.expiresAt >= :now AND pr.key = :key')
            ->setParameters([
                'now' => new \DateTime(),
                'key' => $key
            ])
            ->getQuery()
            ->getSingleResult();
    }


    public function findByUserAndExpiredAtLowerThanNow(User $user): ?PasswordReset
    {
        try {
            return $this->getEntityManager()
                ->createQueryBuilder()
                ->select('pr')
                ->from(PasswordReset::class, 'pr')
                ->where('pr.expiresAt >= :now AND pr.user = :user')
                ->setParameters([
                    'now' => new \DateTime(),
                    'user' => $user
                ])
                ->getQuery()
                ->setMaxResults(1)
                ->getSingleResult();
        } catch (NoResultException $e) {
            return null;
        }
    }

}
