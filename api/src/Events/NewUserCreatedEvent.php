<?php


namespace App\Events;


use App\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class NewUserCreatedEvent extends Event {
    public const NAME = 'user.created';

    protected User $user;
    protected string $password;

    /**
     * NewUserCreatedEvent constructor.
     * @param User $user
     * @param string $password
     */
    public function __construct(User $user, string $password) {
        $this->user = $user;
        $this->password = $password;
    }

    /**
     * @return User
     */
    public function getUser(): User {
        return $this->user;
    }

    /**
     * @return string
     */
    public function getPassword(): string {
        return $this->password;
    }

}
