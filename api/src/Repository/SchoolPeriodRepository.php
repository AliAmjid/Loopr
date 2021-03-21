<?php


namespace App\Repository;


use App\Entity\SchoolPeriod;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NoResultException;
use Doctrine\Persistence\ManagerRegistry;

class SchoolPeriodRepository extends ServiceEntityRepository
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SchoolPeriod::class);
    }

    public function findByBetweenFromNTo(\DateTime $from, \DateTime $to): array
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('sp')
            ->from(SchoolPeriod::class, 'sp')
            ->where('(:from >= sp.from AND :from <= sp.to) OR (:to >= sp.from AND :to <= sp.to)')
            ->setParameters([
                'from' => $from,
                'to' => $to
            ])
            ->getQuery()
            ->getResult();
    }

    public function findActive(): ?SchoolPeriod
    {
        return $this->findForDate(new \DateTime());
    }


    public function findForDate(\DateTime $date)
    {
        try {
            return $this->getEntityManager()
                ->createQueryBuilder()
                ->select('sp')
                ->from(SchoolPeriod::class, 'sp')
                ->where('sp.from < :date AND sp.to > :date')
                ->setParameter('date', $date)
                ->getQuery()
                ->getSingleResult();
        } catch (\Throwable $e) {
            return null;
        }
    }

    public function findByQuarterNYear(int $quarter, int $year)
    {
        try {
            return $this->getEntityManager()
                ->createQueryBuilder()
                ->select('sp')
                ->from(SchoolPeriod::class, 'sp')
                ->where('sp.quarter = :quarter AND sp.schoolYear = :year')
                ->setParameter('quarter', $quarter)
                ->setParameter('year', $year)
                ->getQuery()
                ->getSingleResult();
        } catch (NoResultException $e) {
            return null;
        }
    }
}
