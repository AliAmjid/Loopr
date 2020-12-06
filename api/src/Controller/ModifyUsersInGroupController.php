<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\Group;
use App\Entity\IGroup;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ModifyUsersInGroupController extends AbstractController implements MutationResolverInterface
{
    public function __invoke($item, array $context)
    {
        dump($item);
        dump($context);
        exit();
    }
}
