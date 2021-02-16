<?php


namespace App\Entity;


use App\Entity\Attributes\Tid;
use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PasswordResetRepository")
 */
class PasswordReset
{
    use Tid;

    /** @var User
     * @ORM\ManyToOne(targetEntity="User")
     */
    private User $user;

    /** @var string
     * @ORM\Column(type="string")
     */
    private string $key;

    /**
     * @var DateTime
     * @ORM\Column(type="datetime")
     */
    private DateTime $expiresAt;

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): PasswordReset
    {
        $this->user = $user;
        return $this;
    }

    public function getKey(): string
    {
        return $this->key;
    }

    public function setKey(string $key): PasswordReset
    {
        $this->key = $key;
        return $this;
    }

    public function getExpiresAt(): DateTime
    {
        return $this->expiresAt;
    }

    public function setExpiresAt(DateTime $expiresAt): PasswordReset
    {
        $this->expiresAt = $expiresAt;
        return $this;
    }
}
