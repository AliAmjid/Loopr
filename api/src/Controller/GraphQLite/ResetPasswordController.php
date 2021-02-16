<?php


namespace App\Controller\GraphQLite;


use App\Entity\PasswordReset;
use App\Entity\User;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use App\Repository\PasswordResetRepository;
use App\Service\EmailService;
use Doctrine\ORM\NoResultException;
use Nette\Utils\Random;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use TheCodingMachine\GraphQLite\Annotations\Mutation;

class ResetPasswordController extends AbstractController
{

    public function __construct(
        private UserPasswordEncoderInterface $encoder,
        private EmailService $emailService
    ) {
    }

    #[Mutation]
    public function applyPasswordResetUser(
        string $email,
        string $feRedirectPagePattern
    ): bool {
        $em = $this->getDoctrine()->getManager();
        /** @var User $user */
        $user = $em->getRepository(User::class)->findOneBy(['email' => $email]);
        if (!$user) {
            throw new ClientError(ClientErrorType::NO_USER_FOUND);
        }

        /** @var PasswordResetRepository $passwordResetRepository */
        $passwordResetRepository = $em->getRepository(PasswordReset::class);

        if ($passwordResetRepository->findByUserAndExpiredAtLowerThanNow($user)) {
            throw new ClientError(ClientErrorType::ALREADY_SENT_RESET);
        }

        $passwordReset = new PasswordReset();
        $passwordReset->setUser($user);
        $passwordReset->setKey(Random::generate(15));
        $date = new \DateTime();
        $passwordReset->setExpiresAt(date_modify($date, '+1 day'));
        $em->persist($passwordReset);
        $em->flush();
        $this->emailService->sendPasswordResetEmail($email,
            str_replace('{key}', $passwordReset->getKey(), $feRedirectPagePattern));
        return true;
    }

    #[Mutation]
    public function resetPasswordUser(
        string $key,
        string $newPassword
    ): bool {
        $em = $this->getDoctrine()->getManager();
        /** @var PasswordResetRepository $passwordResetRepository */
        $passwordResetRepository = $em->getRepository(PasswordReset::class);
        try {
            /** @var PasswordReset $passwordReset */
            $passwordReset = $passwordResetRepository->findByKeyAndExpiredAtLowerThanNow($key);
        } catch (NoResultException $noResultException) {
            throw new ClientError(ClientErrorType::NO_USER_FOUND);
        }

        if (strlen($newPassword) < 6) {
            throw new ClientError(ClientErrorType::PASSWORD_TOO_SHORT);
        }
        $user = $passwordReset->getUser();
        $user->setPassword($this->encoder->encodePassword($user, $newPassword));
        $passwordReset->setExpiresAt(new \DateTime());

        $em->persist($passwordReset);
        $em->persist($user);
        $em->flush();
        return true;
    }
}
