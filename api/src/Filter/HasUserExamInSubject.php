<?php


namespace App\Filter;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractContextAwareFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\NameConverter\NameConverterInterface;

class HasUserExamInSubject extends AbstractContextAwareFilter
{
    private Security $security;

    public function __construct(
        ManagerRegistry $managerRegistry,
        ?RequestStack $requestStack = null,
        LoggerInterface $logger = null,
        array $properties = null,
        NameConverterInterface $nameConverter = null,
        Security $security
    ) {
        parent::__construct($managerRegistry, $requestStack, $logger, $properties, $nameConverter);
        $this->security = $security;
    }

    protected function filterProperty(
        string $property,
        $value,
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    ) {

        if (!is_array($value) || count($value) === 0) {
            return;
        }
        $schoolYearsProp = $queryNameGenerator->generateParameterName($property . "_schoolYears");
        $userProp = $queryNameGenerator->generateParameterName($property . "_user");

        $queryBuilder
            ->innerJoin('o.exams', 'e')
            ->leftJoin('e.pointSystem', 'ps')
            ->innerJoin('ps.points', 'pts')
            ->andWhere("pts.user = :$userProp AND e.schoolPeriod IN (:$schoolYearsProp)")
            ->setParameter($schoolYearsProp, $value)
            ->setParameter($userProp, $this->security->getUser()->getId());

    }

    public function getDescription(string $resourceClass): array
    {
        return [
            "hasUserExamInSchoolPeriod" => [
                'property' => 'hasUserExamInSchoolPeriod',
                'type' => 'array',
                'required' => false
            ]
        ];
    }

    public function setSecurity(Security $security)
    {
        $this->security = $security;
    }

}
