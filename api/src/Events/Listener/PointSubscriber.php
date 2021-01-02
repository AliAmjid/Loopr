<?php


namespace App\Events\Listener;


use App\Entity\Point;
use App\Service\NotificationService;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Doctrine\ORM\Event\PreUpdateEventArgs;

class PointSubscriber implements EventSubscriber
{
    private array $oldValues;

    public function __construct(
        private NotificationService $notificationService
    ) {
        $this->oldValues = [];
    }

    public function getSubscribedEvents()
    {
        return [
            Events::preUpdate,
            Events::postUpdate,
            Events::postPersist
        ];
    }

    public function preUpdate(Point $point, PreUpdateEventArgs $args)
    {
        if ($args->getEntity() instanceof Point) {
            if ($args->hasChangedField('points')) {
                $this->oldValues[$point->getId()] = $args->getOldValue('points');
            }
        }
    }

    public function postUpdate(Point $point)
    {
        if (isset($this->oldValues[$point->getId()])) {
            $this->notificationService->sendPointEditedNotification(
                $point,
                $this->oldValues[$point->getId()]
            );
        }
    }

    public function postPersist(Point $point, LifecycleEventArgs $args)
    {
        if (!isset($this->oldValues[$point->getId()])) {
            $this->notificationService->sendPointCreatedNotification(
                $point
            );
        }
    }
}
