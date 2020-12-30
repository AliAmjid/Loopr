<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SimpleUpdateController extends AbstractController implements MutationResolverInterface
{
    public function __invoke($item, array $context)
    {
        $this->getDoctrine()->getManager()->persist($item);
        $this->getDoctrine()->getManager()->flush();
        return $item;
    }

}
