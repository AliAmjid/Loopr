<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Entity\Attributes\Tid;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Mapping as ORM;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\PersistentCollection;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Table(name="`user`")
 */
#[ApiFilter(filterClass: ExistsFilter::class, properties: [
    'classGroup',
    'archivedAt' => false
])]
#[ApiFilter(filterClass: DateFilter::class, properties: [
    'createdAt',
    'archivedAt'
])]
#[ApiFilter(filterClass: SearchFilter::class, properties: [
    'id' => 'exact',
    'firstname' => 'ipartial',
    'lastname' => 'ipartial',
    'role.resources.name' => 'exact',
    'role.resources.id' => 'exact',
    'classGroup.id' => 'exact',
    'group.id' => 'exact',
    'role.id' => 'exact',
    'role.name' => 'exact',
    'email' => 'ipartial'
])]
#[ApiFilter(filterClass: OrderFilter::class, properties: [
    'email',
    'lastname'
])]
class User implements UserInterface
{
    use Tid;

    /** @var string email of user
     * @Assert\Email(mode="loose")
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
     * @var string|null
     * @Groups({"user:write"})
     * @Assert\Length(min="8")
     */
    private ?string $rawPassword = null;


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
     * @Groups({"read:always", "exposed"})
     * @ORM\ManyToOne(targetEntity="ClassGroup", inversedBy="users", fetch="EAGER")
     * @ORM\JoinColumn(name="class_group_id", referencedColumnName="id")
     */
    private ?ClassGroup $classGroup = null;

    /**
     * @var Collection|Group[]
     * @ORM\ManyToMany(targetEntity="Group", mappedBy="users")
     * @Groups({"read:always", "exposed"})
     */
    private $groups;

    /**
     * @var UserPrivateData
     * @ORM\OneToOne(targetEntity="UserPrivateData", inversedBy="user", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:always","exposed", "read:USER_SHOW_ALL"})
     */
    private $privateData;

    /**
     * @var Collection|Notification[]|PersistentCollection
     * @ORM\OneToMany(targetEntity="Notification", mappedBy="user")
     * @Groups({"read:owner", "exposed"})
     */
    private Collection|array|PersistentCollection $notifications;

    /**
     * @var Collection|Subject[]
     * @ORM\OneToMany(targetEntity="Subject", mappedBy="teacher")
     * @Groups({"exposed", "read"})
     */
    private Collection|array $taughtSubjects;

    /**
     * @var Collection|array
     * @ORM\OneToMany(targetEntity="WebPushSubscribe", mappedBy="user")
     */
    private Collection|array $wepPushSubscribes;

    /**
     * @var \DateTime|null
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read", "exposed"})
     */
    private ?\DateTime $archivedAt;

    #[Pure]
    public function __construct()
    {
        $this->groups = new ArrayCollection();
    }

    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return Collection|Group[]
     */
    public function getGroups(): Collection
    {
        return $this->groups;
    }

    /**
     * @return string
     * @internal
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

    public function getLastname(): string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): User
    {
        $this->lastname = $lastname;
        return $this;
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

    public function getClassGroup(): ?ClassGroup
    {
        return $this->classGroup;
    }

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

    public function getPrivateData(): UserPrivateData
    {
        return $this->privateData;
    }

    public function setPrivateData(UserPrivateData $privateData): User
    {
        $this->privateData = $privateData;
        return $this;
    }

    public function getRawPassword(): ?string
    {
        return $this->rawPassword;
    }

    public function setRawPassword(?string $rawPassword): User
    {
        $this->rawPassword = $rawPassword;
        return $this;
    }

    /**
     * @return Notification[]|Collection
     */
    public function getNotifications(): Collection|array
    {
        return $this->notifications;
    }

    public function getTaughtSubjects(): Collection|array
    {
        return $this->taughtSubjects;
    }

    public function getArchivedAt(): ?\DateTime
    {
        return $this->archivedAt;
    }

    public function setArchivedAt(?\DateTime $archivedAt): User
    {
        $this->archivedAt = $archivedAt;
        return $this;
    }

    /**
     * @Groups({"exposed", "read:owner"})
     */
    public function getNotificationViewAtNullCount(): int
    {
        $c = Criteria::create()
            ->andWhere(Criteria::expr()->eq('viewAt', null));
        return $this->notifications->matching($c)->count();
    }
}
