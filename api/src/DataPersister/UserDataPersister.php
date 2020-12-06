<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\ClassGroup;
use App\Entity\User;
use App\Events\NewUserCreatedEvent;
use Doctrine\Persistence\ManagerRegistry;
use Nette\Utils\Random;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Constraints\Uuid;

class UserDataPersister implements ContextAwareDataPersisterInterface
{

    private ContextAwareDataPersisterInterface $decorated;
    private UserPasswordEncoderInterface $encoder;
    protected MessageBusInterface $messageBus;
    private ManagerRegistry $managerRegistery;

    public function __construct(
        ContextAwareDataPersisterInterface $decorated,
        UserPasswordEncoderInterface $encoder,
        MessageBusInterface $messageBus,
        ManagerRegistry $managerRegistry
    ) {
        $this->decorated = $decorated;
        $this->encoder = $encoder;
        $this->messageBus = $messageBus;
        $this->managerRegistery = $managerRegistry;
    }

    public function supports($data, array $context = []): bool
    {
        return $this->decorated->supports($data, $context);
    }

    public function persist($data, array $context = [])
    {
        if ($data instanceof User && ($context['graphql_operation_name'] ?? null) == 'create') {
            $password = Random::generate(15);
            $data->setPassword($this->encoder->encodePassword($data, $password));
            $result = $this->decorated->persist($data, $context);
            $event = new NewUserCreatedEvent($result, $password);
            $this->messageBus->dispatch($event);
        } elseif ($data instanceof User && ($context['graphql_operation_name'] ?? null) == 'edit') {
            $data->setPassword($this->encoder->encodePassword($data, $data->getPassword()));
            $result = $this->decorated->persist($data, $context);
        } elseif ($data instanceof ClassGroup && in_array(($context['graphql_operation_name'] ?? null),
                ['edit', 'create'])) {
            /** @var ClassGroup $classGroup */
            $classGroup = $this->decorated->persist($data, $context);
            $users = $classGroup->usersToAdd;
            $this->managerRegistery->getManager()->persist($classGroup);
            foreach ($users as $user) {
                $user->setClassGroup($classGroup);
                $this->managerRegistery->getManager()->persist($user);
            }
            $this->managerRegistery->getManager()->flush();
            return $classGroup;
        } else {
            $result = $this->decorated->persist($data, $context);
        }

        return $result;
    }

    public function remove($data, array $context = [])
    {
        return $this->decorated->remove($data, $context);
    }
}
