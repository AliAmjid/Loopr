<?php


namespace App\Events\Handler;


use App\Entity\User;
use App\Events\NewUserCreatedEvent;
use App\Service\EmailService;
use Doctrine\ORM\Decorator\EntityManagerDecorator;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

class UserCreatedHandler implements MessageHandlerInterface {
    private EmailService $emailService;
    private ObjectManager $em;

    public function __construct(
        EmailService $emailService,
        ManagerRegistry $registry
    ) {
        $this->em = $registry->getManager();
        $this->emailService = $emailService;
    }

    public function __invoke(NewUserCreatedEvent $newUserCreatedEvent) {
        //send email
        /** @var User $user */
        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $newUserCreatedEvent->getEmail()]);
        $this->emailService->sendAfterRegistrationEmail($user, $newUserCreatedEvent->getPassword());

        //todo: Implement welcome notification
    }
}
