<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\QueryItemResolverInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetCurrentSchoolPeriodController extends AbstractController implements QueryItemResolverInterface
{
    public function __invoke($item, array $context)
    {

    }
}
