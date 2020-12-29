<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class NotificationController extends AbstractController implements MutationResolverInterface
{

    public function __invoke($item, array $context)
    {
        dump($context);
        dump($item);
    }
}
