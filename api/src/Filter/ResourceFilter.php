<?php


namespace App\Filter;


use ApiPlatform\Core\Api\IriConverterInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractContextAwareFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\AclResource;
use App\Enum\AclResourceEnum;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Serializer\NameConverter\NameConverterInterface;

class ResourceFilter extends AbstractContextAwareFilter
{
    private IriConverterInterface $iriConverter;

    public function __construct(
        ManagerRegistry $managerRegistry,
        ?RequestStack $requestStack = null,
        LoggerInterface $logger = null,
        array $properties = null,
        NameConverterInterface $nameConverter = null,
        IriConverterInterface $iriConverter
    ) {
        parent::__construct($managerRegistry, $requestStack, $logger, $properties, $nameConverter);
        $this->iriConverter = $iriConverter;
    }

    protected function filterProperty(
        string $property,
        $value,
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    ) {

        $parameterName = $queryNameGenerator->generateParameterName('role');
        /** @var AclResource $resource */
        $resource = $this->iriConverter->getItemFromIri($value);
        $queryBuilder
            ->leftJoin('o.role', 'role_ss')
            ->andWhere(":idResource MEMBER OF role_ss.resources")
            ->setParameter('idResource', $resource->getId());
    }

    public function getDescription(string $resourceClass): array
    {
        $description = [];
        foreach ($this->properties as $property => $strategy) {
            $description["resource_$property"] = [
                'property' => $property,
                'type' => 'string',
                'required' => false,
                'swagger' => [
                    'description' => 'Filter using a regex. This will appear in the Swagger documentation!',
                    'name' => 'Custom name to use in the Swagger documentation',
                    'type' => 'Filters users by resources',
                ],
            ];
        }

        return $description;
    }
}
