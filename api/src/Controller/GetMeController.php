<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\QueryItemResolverInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetMeController extends AbstractController implements QueryItemResolverInterface {

    public function __invoke($item, array $context) {
        return $this->getUser();
    }
}
