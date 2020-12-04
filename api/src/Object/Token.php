<?php


namespace App\Object;


use ApiPlatform\Core\Annotation\ApiProperty;
use App\Entity\User;
use Symfony\Component\Serializer\Annotation\Groups;

class Token
{

    /**
     * @var string Use token in header like this: 'Authorization: Bearer {token}'
     * @Groups("read:always")
     */
    private string $token;

    /** @var User
     * @Groups("read:always")
     * @ApiProperty(identifier=true)
     */
    private User $user;

    /**
     * Token constructor.
     * @param string $token
     * @param User $user
     */
    public function __construct(string $token, User $user)
    {
        $this->token = $token;
        $this->user = $user;
    }

    /**
     * @return string
     */
    public function getToken(): string
    {
        return $this->token;
    }


    /**
     * @param string $id
     */
    public function setId(string $id): void
    {
        $this->id = $id;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }
}
