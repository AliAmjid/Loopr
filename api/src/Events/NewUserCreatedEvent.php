<?php


namespace App\Events;


use App\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class NewUserCreatedEvent {
    public const NAME = 'user.created';

    protected string $email;
    protected string $password;

    /**
     * NewUserCreatedEvent constructor.
     * @param User $user
     * @param string $password
     */
    public function __construct(User $user, string $password) {
        $this->email = $user->getEmail();
        $this->password = $password;
    }

    /**
     * @return string
     */
    public function getEmail(): string {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getPassword(): string {
        return $this->password;
    }

}
