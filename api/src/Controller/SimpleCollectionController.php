<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\QueryCollectionResolverInterface;

class SimpleCollectionController implements QueryCollectionResolverInterface
{
    public function __invoke(iterable $collection, array $context): iterable
    {
        return $collection;
    }
}
