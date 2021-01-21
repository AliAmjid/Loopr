<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\QueryItemResolverInterface;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetMeController extends AbstractController implements QueryItemResolverInterface
{

    /**
     * @return User
     */
    public function __invoke($item, array $context): User
    {
        /** @var User $user */
        $user = $this->getUser();
        return $user;
    }
}
