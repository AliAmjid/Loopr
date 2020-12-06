<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Entity\Attributes\Tid;
use Doctrine\ORM\Mapping as ORM;

use Doctrine\Common\Collections\Collection;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use App\Filter\ResourceFilter;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table(name="`user`")
 * @ApiFilter(SearchFilter::class, properties={
 *     "id": "exact",
 *      "firstname": "partial",
 *      "lastname": "partial",
 *      "email": "partial",
 *     "role.resources.name": "exact",
 *     "role.resources.id": "exact",
 *     "classGroup.id": "exact",
 *     "groups.id": "exact"
 * })
 * @ApiFilter(DateFilter::class, properties={"createdAt"})
 */
class User implements UserInterface
{
    use Tid;


    /** @var string email of user
     * @Assert\Email()
     * @Assert\NotBlank()
     * @ORM\Column(type="string",unique=true)
     * @Groups({"exposed", "user:write", "read"})
     */
    private string $email;

    /**
     * @ORM\ManyToOne(targetEntity="AclRole")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"user:role", "exposed", "read", "user:write"})
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
     * @Groups({"read", "user:write", "exposed"})
     */
    private string $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read", "user:write", "exposed"})
     */
    private string $lastname;

    /** @var \DateTimeInterface
     * @ORM\Column(type="datetime")
     * @Groups({"read", "exposed"})
     */
    private \DateTimeInterface $createdAt;

    /**
     * @var ClassGroup|null
     * @Groups({"read", "user:write", "exposed"})
     * @ORM\ManyToOne(targetEntity="ClassGroup", inversedBy="users")
     * @ORM\JoinColumn(name="class_group_id", referencedColumnName="id")
     */
    private ?ClassGroup $classGroup = null;

    /**
     * @var Collection|Groups[]
     * @ORM\ManyToMany(targetEntity="Group", mappedBy="users")
     * @Groups({"read", "user:write", "exposed"})
     */
    private $groups;

    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return Collection|Groups[]
     */
    public function getGroups(): Collection
    {
        return $this->groups;
    }

    /**
     * @return string
     * @internal
     * @deprecated
     * @ApiProperty(deprecationReason="use email instead")
     */
    public function getUsername(): string
    {
        return $this->id;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getRoles(): array
    {
        return [$this->role->getName()];
    }

    public function setRole(AclRole $role): void
    {
        $this->role = $role;
    }

    public function getRole(): AclRole
    {
        return $this->role;
    }

    public function getPassword(): string
    {
        return (string)$this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function getSalt()
    {
        return null;
    }

    public function eraseCredentials()
    {
    }

    /**
     * @return string
     */
    public function getLastname(): string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): User
    {
        $this->lastname = $lastname;
        return $this;
    }

    /**
     * @ApiProperty(deprecationReason="Replaced with firstname and lastname")
     */
    public function getName(): ?string
    {
        return $this->firstname . " " . $this->lastname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;
        return $this;
    }

    public function getFirstname(): string
    {
        return $this->firstname;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    /**
     * @return ClassGroup|null
     */
    public function getClassGroup(): ?ClassGroup
    {
        return $this->classGroup;
    }

    /**
     * @param ClassGroup|null $classGroup
     * @return User
     */
    public function setClassGroup(?ClassGroup $classGroup): User
    {
        $this->classGroup = $classGroup;
        return $this;
    }

    /**
     * @Groups({"read"})
     */
    public function getResources()
    {
        return $this->getRoles();
    }

    /**
     * @ORM\PrePersist()
     */
    public function setCreatedAt(): void
    {
        $this->createdAt = new \DateTime();
    }
}
