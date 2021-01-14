<?php


namespace App\Service;


use App\Entity\Exam;
use App\Entity\Notification;
use App\Entity\Point;
use App\Entity\User;
use App\Enum\NotificationType;
use App\Events\ProcessNotificationEvent;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Messenger\MessageBusInterface;

class NotificationService
{
    private MessageBusInterface $messageBus;
    private ObjectManager $em;

    public function __construct(
        MessageBusInterface $messageBus,
        ManagerRegistry $managerRegistry
    ) {
        $this->em = $managerRegistry->getManager();
        $this->messageBus = $messageBus;
    }

    public function sendUserWelcomeNotification(
        User $user
    ) {
        $this->createNDispatchNotification(
            $user,
            NotificationType::USER_WELCOME,
            [
                'name' => $user->getFirstname() . " " . $user->getLastname()
            ]
        );
    }

    public function sendPointEditedNotification(
        Point $point,
        int $old
    ) {
        $this->createNDispatchNotification(
            $point->getUser(),
            NotificationType::POINT_CHANGED,
            [
                'old' => $old,
                'exam' => $point->getPointSystem()->getExam()->getId(),
                'examName' => $point->getPointSystem()->getExam()->getName(),
                'new' => $point->getPoints(),
            ]
        );
    }

    public function sendPointCreatedNotification(
        Point $point,
    ) {
        $this->createNDispatchNotification(
            $point->getUser(),
            NotificationType::POINT_CHANGED,
            [
                'exam' => $point->getPointSystem()->getExam()->getId(),
                'examName' => $point->getPointSystem()->getExam()->getName(),
                'new' => $point->getPoints(),
            ]
        );
    }


    private function createNDispatchNotification(
        User $user,
        string $type,
        array $params = []
    ) {
        $notification = new Notification();
        $notification->setUser($user);
        $notification->setParameters($params);
        $notification->setType($type);
        $this->em->persist($notification);
        $this->em->flush();
        $this->messageBus->dispatch(new ProcessNotificationEvent($notification));
    }
}
