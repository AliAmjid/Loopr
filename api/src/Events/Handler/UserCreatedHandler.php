<?php


namespace App\Events\Handler;


use App\Entity\User;
use App\Events\NewUserCreatedEvent;
use App\Service\EmailService;
use App\Service\NotificationService;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

class UserCreatedHandler implements MessageHandlerInterface
{
    private EmailService $emailService;
    private ObjectManager $em;
    private NotificationService $notificationService;

    public function __construct(
        EmailService $emailService,
        ManagerRegistry $registry,
        NotificationService $notificationService
    ) {
        $this->em = $registry->getManager();
        $this->emailService = $emailService;
        $this->notificationService = $notificationService;
    }

    public function __invoke(NewUserCreatedEvent $newUserCreatedEvent)
    {
        $user = $newUserCreatedEvent->get($this->em);
        $this->emailService->sendAfterRegistrationEmail(
            $newUserCreatedEvent->getEmail(),
            $newUserCreatedEvent->getPassword()
        );


        $this->notificationService->sendUserWelcomeNotification($user);
    }
}
