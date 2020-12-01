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
 * @ORM\Table(name="`group`", uniqueConstraints={
 *     @UniqueConstraint(name="name_unique_g", columns={"year", "section"})
 *     })
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "section":"partial"})
 */
class Group implements IGroup
{
    use Tid;

    /** @var string
     * @ORM\Column(type="string")
     * @Groups({"group:read", "group:write", "group:basic"})
     * @Assert\NotBlank()
     * @Assert\NotNull()
     */
    private string $section;

    /**
     * @var User[]
     * @ORM\ManyToMany(targetEntity="User")
     * @Groups({"group:read", "group:write"})
     */
    private $users;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User")
     * @Groups({"group:read"})
     */
    private User $createdBy;

    /**
     * @var \DateTime
     * @ORM\Column(type="datetime")
     * @Groups({"group:read"})
     */
    private \DateTime $createdAt;

    /**
     * @Groups({"group:read", "group:basic", "subjectHasGroup:read"})
     * @var Collection
     * @ORM\OneToMany(targetEntity="SubjectHasGroup", mappedBy="group")
     * @ApiProperty(readableLink=true)
     * @MaxDepth(5)
     */
    private Collection $subjectRelations;

    /**
     * @return Collection
     */
    public function getSubjectRelations(): Collection
    {
        return $this->subjectRelations;
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

    public function addUser(User $user): void
    {
        $this->users->add($user);
    }

    public function removeUser(User $user)
    {
        $this->users->removeElement($user);
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
