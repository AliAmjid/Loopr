<?php


namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Annotation\InjectDateTime;
use App\Annotation\InjectLoggedUser;
use App\Entity\Attributes\Tid;
use App\Enum\AclResourceEnum;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
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
     * @Groups({"read", "exposed",  "classGroup:write"})
     */
    private int $year;

    /** @var string
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     * @Assert\NotNull()
     * @Groups({"read", "exposed",  "classGroup:write"})
     */
    private string $section;

    /**
     * @var Collection|User[]
     * @ORM\OneToMany(targetEntity="User", mappedBy="classGroup")
     * @Groups({"exposed", "read"})
     */
    private Collection $users;

    /** @var User|null Teacher needs to be user with resource GROUP_TEACHER
     * @ORM\ManyToOne(targetEntity="User")
     * @Groups({"read", "exposed",  "classGroup:write"})
     */
    private ?User $teacher = null;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User")
     * @Groups({"read"})
     */
    private User $createdBy;

    /**
     * @var \DateTime
     * @ORM\Column(type="datetime")
     */
    private \DateTime $createdAt;

    /**
     * @Groups({"read", "exposed"})
     * @var Collection
     * @ORM\OneToMany(targetEntity="Subject", mappedBy="classGroup")
     */
    private Collection $subjects;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    /**
     * @return Collection
     */
    public function getSubjects(): Collection
    {
        return $this->subjects;
    }

    /**
     * @param Collection $subjects
     * @return ClassGroup
     */
    public function setSubjects(Collection $subjects): ClassGroup
    {
        $this->subjects = $subjects;
        return $this;
    }

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
     * @return User[]
     */
    public function getUsers(): array
    {
        return $this->users->getValues();
    }

    public function removeUser(User $user)
    {
        $this->users->removeElement($user);
    }

    /**
     * @return User|null
     */
    public function getTeacher(): ?User
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

    public function addUser(User $user): User
    {
        if (!$user->getRole()->hasResource(AclResourceEnum::USER_CAN_STUDY)) {
            throw new ClientError(ClientErrorType::USER_CAN_NOT_BE_TAUGHT);
        }
        $user->setClassGroup($this);
        $this->users->add($user);
        return $user;
    }

    public function deleteUser(User $user): User
    {
        $user->setClassGroup(null);
        $this->users->removeElement($user);
        return $user;
    }
}
