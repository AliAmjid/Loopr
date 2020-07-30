<?php


namespace App\Security;


use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\AuthorizationHeaderTokenExtractor;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class JwtTokenAuthenticator extends AbstractGuardAuthenticator {
    private $jwtEncoder;
    private $em;

    public function __construct(JWTEncoderInterface $jwtEncoder, EntityManagerInterface $em) {
        $this->jwtEncoder = $jwtEncoder;
        $this->em = $em;
    }


    public function supports(Request $request) {
        return true;
    }

    public function getCredentials(Request $request) {
        $extractor = new AuthorizationHeaderTokenExtractor(
            'Bearer',
            'Authorization'
        );
        $token = $extractor->extract($request);
        if (!$token) {
            return '';
        }
        return $token;
    }

    public function getUser($credentials, UserProviderInterface $userProvider) {
        if (!empty($credentials)) {
            $data = $this->jwtEncoder->decode($credentials);
            if ($data === false) {
                throw new CustomUserMessageAuthenticationException('Invalid Token');
            }

            return $this->em->find(User::class, $data['id']);
        }
        return null;
    }

    public function checkCredentials($credentials, UserInterface $user) {
        return true;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception) {
        throw new CustomUserMessageAuthenticationException('Please log in');
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey) {
        // TODO: Implement onAuthenticationSuccess() method.
    }

    public function supportsRememberMe() {
        return true;
    }

    public function start(Request $request, AuthenticationException $authException = null) {
            // TODO: Implement start() method.
    }

}
