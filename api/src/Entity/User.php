<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use App\Entity\Attributes\Tid;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table(name="`user`")
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "name": "partial", "username": "partial"})
 */
class User implements UserInterface {

    use Tid;


    /** @var string email of user
     * @Assert\Email()
     * @ORM\Column(type="string",unique=true)
     * @Groups({"user:read", "user:write"})
     */
    private string $username;

    /**
     * @ORM\ManyToOne(targetEntity="AclRole")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"aclRole:read", "user:write"})
     */
    private AclRole $role;

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Groups({"user:password"})
     */
    private string $password;


    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read", "user:write"})
     */
    private string $name;

    /** @var \DateTimeInterface
     * @ORM\Column(type="datetime")
     * @Groups({"user:read"})
     */
    private \DateTimeInterface $createdAt;


    public function getId(): ?string {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getUsername(): string {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username): void {
        $this->username = $username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array {
        return ['ROLE_USER'];
    }

    public function setRole(AclRole $role): void {
        $this->role = $role;
    }

    public function getRole(): AclRole {
        return $this->role;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string {
        return (string)$this->password;
    }

    public function setPassword(string $password): self {
        $this->password = $password;
        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt() {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials() {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getName(): ?string {
        return $this->name;
    }

    public function setName(string $name): self {
        $this->name = $name;
        return $this;
    }

    /**
     * @Groups({"user:read"})
     */
    public function getResources() {
        return $this->getRoles();
    }

    /**
     * @ORM\PrePersist()
     */
    public function setCreatedAt(): void {
        $this->createdAt = new \DateTime();
    }

    public function getCreatedAt(): \DateTimeInterface {
        return $this->createdAt;
    }
}
