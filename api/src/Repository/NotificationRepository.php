<?php


namespace App\Repository;


use App\Entity\Notification;
use App\Entity\SchoolPeriod;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class NotificationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Notification::class);
    }

    public function setAllUnreadNotificationRead(User $user)
    {
        $qb = $this->getEntityManager()
            ->createQueryBuilder();
        $date = new \DateTime();
        $date = $date->format('Y-m-d H:i:s');
        $qb->update(Notification::class, 'n')
            ->set('n.viewAt', $qb->expr()->literal($date))
            ->where('n.viewAt IS NULL')
            ->andWhere('n.user = :user')
            ->setParameter('user', $user);

        $qb->getQuery()->execute();
    }
}
