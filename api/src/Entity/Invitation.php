<?php


namespace App\Entity;

use App\Entity\Attributes\Tid;
use Doctrine\ORM\Mapping as ORM;
use Nette\Utils\Random;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity()
 */
class Invitation {
    use Tid;

    /**
     * @var \DateTimeInterface
     * @ORM\Column(type="datetime")
     * @Groups({"inviration:read"})
     */
    private \DateTimeInterface $createdAt;

    /**
     * @var string
     * @ORM\Column(type="string", unique=true)
     * @Groups({"invitation:read"})
     */
    private string $code;

    /** @var User
     * @ORM\ManyToOne(targetEntity="User")
     * @Groups({"invitation:write", "invitation:read"})
     */
    private User $user;

    /** @var bool
     * @ORM\Column(type="boolean")
     * @Groups({"invitation:read"})
     */
    private bool $isUsed = false;

    public function __construct(
        User $user
    ) {
        $this->user = $user;
        $this->code = $user->getId() . '-' . Random::generate(15, 'a-z');
        $this->createdAt = new \DateTime();
    }

    /**
     * @return \DateTimeInterface
     */
    public function getCreatedAt(): \DateTimeInterface {
        return $this->createdAt;
    }

    /**
     * @param \DateTimeInterface $createdAt
     */
    public function setCreatedAt(\DateTimeInterface $createdAt): void {
        $this->createdAt = $createdAt;
    }

    /**
     * @return string
     */
    public function getCode(): string {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode(string $code): void {
        $this->code = $code;
    }

    /**
     * @return User
     */
    public function getUser(): User {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user): void {
        $this->user = $user;
    }

    /**
     * @return bool
     */
    public function isUsed(): bool {
        return $this->isUsed;
    }

    /**
     * @param bool $isUsed
     */
    public function setIsUsed(bool $isUsed): void {
        $this->isUsed = $isUsed;
    }
}
