<?php


namespace App\Events\Handler;


use App\Events\ProcessNotificationEvent;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Messenger\MessageBusInterface;

class ProcessNotificationHandler implements MessageHandlerInterface
{
    private ObjectManager $em;
    private MessageBusInterface $bus;

    public function __construct(
        ManagerRegistry $registry,
        MessageBusInterface $bus
    ) {
        $this->em = $registry->getManager();
        $this->bus = $bus;
    }

    public function __invoke(ProcessNotificationEvent $event)
    {
        $notification = $event->get($this->em);

        $update = new Update(
            '/user/' . $notification->getUser()->getId() . 'notifications/',
            json_encode(['id' => '/notification/' . $notification->getId()])
        );

        $this->bus->dispatch($update);
    }
}
