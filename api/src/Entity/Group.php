<?php


namespace App\Entity;


use App\Annotation\InjectDateTime;
use App\Annotation\InjectLoggedUser;
use App\Entity\Attributes\Tid;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\UniqueConstraint;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\Table(name="`group`", uniqueConstraints={
 *     @UniqueConstraint(name="name_unique_g", columns={"year", "section"})
 *     })
 */
class Group implements IGroup
{
    use Tid;

    /** @var int
     * @ORM\Column(type="integer", length=4)
     * @Groups({"group:read", "group:write"})
     * @Assert\NotNull()
     * @Assert\NotBlank()
     */
    private int $year;

    /** @var string
     * @ORM\Column(type="string")
     * @Groups({"group:read", "group:write"})
     * @Assert\NotBlank()
     * @Assert\NotNull()
     */
    private string $section;

    /**
     * @var Collection
     * @ORM\ManyToMany(targetEntity="User")
     * @Groups({"group:read", "group:write"})
     */
    private Collection $users;

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
     * @return int
     */
    public function getYear(): int
    {
        return $this->year;
    }

    /**
     * @param int $year
     * @return Group
     */
    public function setYear(int $year): Group
    {
        $this->year = $year;
        return $this;
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
     * @return Collection
     */
    public function getUsers(): Collection
    {
        return $this->users;
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
