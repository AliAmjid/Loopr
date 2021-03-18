<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\QueryItemResolverInterface;
use App\Entity\User;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class GetMeController extends AbstractController implements QueryItemResolverInterface
{
    public function __construct(
        private Security $security
    ) {
    }

    /**
     * @return User
     */
    public function __invoke($item, array $context): User
    {
        if (!$this->security->isGranted('USER_LOGGED')) {
            throw new ClientError(ClientErrorType::ACCESS_DENIED);
        }
        /** @var User $user */
        $user = $this->getUser();
        return $user;
    }
}
