<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\QueryItemResolverInterface;
use App\Entity\User;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use App\Object\Token;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class LoginController extends AbstractController implements QueryItemResolverInterface {

    private UserPasswordEncoderInterface $encored;
    private JWTEncoderInterface $JWTEncoder;

    public function __construct(
        UserPasswordEncoderInterface $encoder,
        JWTEncoderInterface $JWTEncoder

    ) {
        $this->encored = $encoder;
        $this->JWTEncoder = $JWTEncoder;
    }

    public function __invoke($item, array $context) {
        $args = $context['args'];
        /** @var User $user */
        $user = $this->getDoctrine()->getManager()->getRepository(User::class)->findOneBy(['email' => $args['email']]);

        if ($user && $this->encored->isPasswordValid($user, $args['password'])) {
            return new Token($this->JWTEncoder->encode(['id' => $user->getId()]), $user);
        } else {
            throw new ClientError(ClientErrorType::USER_NOT_FOUND);
        }
    }
}
