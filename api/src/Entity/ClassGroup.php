<?php


namespace App\Entity;


use App\Annotation\InjectDateTime;
use App\Annotation\InjectLoggedUser;
use App\Entity\Attributes\Tid;
use App\Enum\AclResourceEnum;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\Table(name="`class_group`", uniqueConstraints={
 *     @ORM\UniqueConstraint(name="name_unique_cg", columns={"year", "section"})
 *     })
 */
class ClassGroup implements IGroup
{
    use Tid;

    /** @var int
     * @ORM\Column(type="integer", length=4)
     * @Assert\NotBlank()
     * @Assert\NotNull()
     */
    private int $year;

    /** @var string
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     * @Assert\NotNull()
     */
    private string $section;

    /**
     * @var Collection
     * @ORM\OneToMany(targetEntity="User", mappedBy="classGroup")
     */
    private Collection $users;

    /** @var User Teacher needs to be user with resource GROUP_TEACHER
     * @ORM\ManyToOne(targetEntity="User")
     * @Assert\NotNull()
     */
    private User $teacher;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User")
     */
    private User $createdBy;

    /**
     * @var \DateTime
     * @ORM\Column(type="datetime")
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
     * @return ClassGroup
     */
    public function setYear(int $year): ClassGroup
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
     * @return ClassGroup
     */
    public function setSection(string $section): ClassGroup
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
     * @return ClassGroup
     */
    public function setUsers(Collection $users): ClassGroup
    {
        $this->users = $users;
        return $this;
    }

    /**
     * @return User
     */
    public function getTeacher(): User
    {
        return $this->teacher;
    }

    /**
     * @param User $teacher
     * @return ClassGroup
     */
    public function setTeacher(User $teacher): ClassGroup
    {
        if (!$teacher->getRole()->hasResource(AclResourceEnum::GROUP_TEACHER)) {
            throw new ClientError(ClientErrorType::USER_IS_NOT_TEACHER);
        }
        $this->teacher = $teacher;
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
     * @param User $createdBy
     * @InjectLoggedUser(operations={"create"})
     * @return ClassGroup
     */
    public function setCreatedBy(User $createdBy): ClassGroup
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
     * @param \DateTime $createdAt
     * @InjectDateTime(operations={"create"})
     * @return ClassGroup
     */
    public function setCreatedAt(\DateTime $createdAt): ClassGroup
    {
        $this->createdAt = $createdAt;
        return $this;
    }
}
