<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\User;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;

class ChangeUserPasswordController extends AbstractController implements MutationResolverInterface {

    private UserPasswordEncoderInterface $passwordEncoder;

    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder,
        private Security $security
    ) {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function __invoke($item, array $context)
    {
        if (!$this->security->isGranted('USER_LOGGED')) {
            throw new ClientError(ClientErrorType::ACCESS_DENIED);
        }

        /** @var User $user */
        $user = $this->getUser();
        $args = $context['args']['input'];

        if (!$this->passwordEncoder->isPasswordValid($user, $args['oldPassword'])) {
            throw new ClientError(ClientErrorType::OLD_PASSWORD_IS_WRONG);
        }

        $user->setPassword($this->passwordEncoder->encodePassword($user, $args['newPassword']));
        $this->getDoctrine()->getManager()->persist($user);
        $this->getDoctrine()->getManager()->flush();
        return $user;
    }
}
