<?php


namespace App\Events;


use App\Entity\Notification;
use Doctrine\Persistence\ObjectManager;

class ProcessNotificationEvent
{
    private string $id;

    public function __construct(Notification $notification)
    {
        $this->id = $notification->getId();
    }


    public function get(ObjectManager $manager): Notification
    {
        return $manager->find(Notification::class, $this->id);
    }
}
