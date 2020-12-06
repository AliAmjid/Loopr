<?php


namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Annotation\InjectDateTime;
use App\Annotation\InjectLoggedUser;
use App\Entity\Attributes\Tid;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\UniqueConstraint;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity()
 * @ORM\Table(name="`group`")
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "section":"partial"})
 */
class Group implements IGroup
{
    use Tid;

    /** @var string
     * @ORM\Column(type="string", unique=true)
     * @Groups({"read", "exposed",  "group:write", "group:basic"})
     * @Assert\NotBlank()
     * @Assert\NotNull()
     */
    private string $section;

    /**
     * @var User[]
     * @ORM\ManyToMany(targetEntity="User", inversedBy="groups")
     * @Groups({"read", "exposed"})
     */
    private $users;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User")
     * @Groups({"read", "exposed"})
     */
    private User $createdBy;

    /**
     * @var \DateTime
     * @ORM\Column(type="datetime")
     * @Groups({"read", "exposed"})
     */
    private \DateTime $createdAt;

    /**
     * @Groups({"read", "exposed"})
     * @var Collection
     * @ORM\OneToMany(targetEntity="Subject", mappedBy="group")
     */
    private Collection $subjects;

    /**
     * @return Collection
     */
    public function getSubjects(): Collection
    {
        return $this->subjects;
    }

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    /**
     * @return string
     */
    public function getSection(): string
    {
        return $this->section;
    }

    /**
     * @param string $section
     * @return Group
     */
    public function setSection(string $section): Group
    {
        $this->section = $section;
        return $this;
    }

    /**
     * @return User[]
     */
    public function getUsers(): array
    {
        return $this->users->getValues();
    }

    public function addUser(User $user): User
    {
        $this->users->add($user);
        return $user;
    }

    public function deleteUser(User $user): User
    {
        $this->users->removeElement($user);
        return $user;
    }

    /**
     * @param Collection $users
     * @return Group
     */
    public function setUsers(Collection $users): Group
    {
        $this->users = $users;
        return $this;
    }

    /**
     * @return User
     */
    public function getCreatedBy(): User
    {
        return $this->createdBy;
    }

    /**
     * @InjectLoggedUser(operations={"create"})
     * @param User $createdBy
     * @return Group
     */
    public function setCreatedBy(User $createdBy): Group
    {
        $this->createdBy = $createdBy;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    /**
     * @InjectDateTime(operations={"create"})
     * @param \DateTime $createdAt
     * @return Group
     */
    public function setCreatedAt(\DateTime $createdAt): Group
    {
        $this->createdAt = $createdAt;
        return $this;
    }
}
