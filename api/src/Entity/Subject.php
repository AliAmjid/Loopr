<?php


namespace App\Entity;


use App\Entity\Attributes\Tid;
use App\Enum\AclResourceEnum;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\HasLifecycleCallbacks()
 */
class Subject
{
    use Tid;

    /**
     * @var SubjectType
     * @ORM\ManyToOne(targetEntity="SubjectType")
     * @Groups({"read", "exposed", "subject:write"})
     */
    private $subjectType;

    /**
     * @var Group|null
     * @ORM\ManyToOne(targetEntity="Group", inversedBy="subjects")
     * @Groups({"read", "exposed"})
     */
    private ?Group $group = null;

    /** @var ClassGroup|null
     * @ORM\ManyToOne(targetEntity="ClassGroup", inversedBy="subjects")
     * @Groups({"read", "exposed"})
     */
    private ?ClassGroup $classGroup = null;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User", inversedBy="taughtSubjects")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read", "exposed", "subject:write"})
     */
    private User $teacher;

    /**
     * @var string|null
     * @ORM\Column(type="string", nullable=true)
     * @Groups({"read:teacher","write:teacher", "exposed"})
     * @Assert\Regex(pattern="/#([a-fA-F0-9]{3}){1,2}\b/", message="color regex not valid")
     */
    private ?string $teacherCardColor = null;


    /**
     * @Groups({"subject:write"})
     */
    private ?string $iGroupIri = null;

    /**
     * subject constructor.
     * @param SubjectType $subjectType
     * @param User $teacher
     */
    public function __construct(
        SubjectType $subjectType,
        User $teacher
    ) {
        $this->subjectType = $subjectType;
        $this->teacher = $teacher;
    }


    /**
     * @Groups({"read", "exposed"})
     */
    public function getIGroup(): IGroup
    {
        return $this->group ?? $this->classGroup;
    }

    /**
     * @return SubjectType
     */
    public function getSubjectType(): SubjectType
    {
        return $this->subjectType;
    }

    /**
     * @param SubjectType $subjectType
     * @return Subject
     */
    public function setSubjectType(
        SubjectType $subjectType
    ): Subject {
        $this->subjectType = $subjectType;
        return $this;
    }

    /**
     * @return Group|null
     */
    public function getGroup(): ?Group
    {
        return $this->group;
    }

    /**
     * @param ClassGroup|null $classGroup
     * @return Subject
     */
    public function setClassGroup(
        ?ClassGroup $classGroup
    ): Subject {
        $this->classGroup = $classGroup;
        return $this;
    }

    /**
     * @return User
     */
    public function getTeacher(): User
    {
        return $this->teacher;
    }

    public function setIGroupIri(string $iGroupIri): Subject
    {
        $this->iGroupIri = $iGroupIri;
        return $this;
    }

    public function getIGroupIri(): ?string
    {
        return $this->iGroupIri;
    }

    /**
     * @param User $teacher
     * @return Subject
     */
    public function setTeacher(
        User $teacher
    ): Subject {
        $this->teacher = $teacher;
        return $this;
    }

    public function setIGroup(IGroup $group)
    {
        if ($group instanceof Group) {
            $this->classGroup = null;
            $this->group = $group;
        } elseif ($group instanceof ClassGroup) {
            $this->group = null;
            $this->classGroup = $group;
        } else {
            throw new \RuntimeException(get_class($group) . " not implemented in IGroup");
        }
    }

    public function getClassGroup(): ?ClassGroup
    {
        return $this->classGroup;
    }

    /**
     * @return string|null
     */
    public function getTeacherCardColor(): ?string
    {
        return $this->teacherCardColor;
    }

    /**
     * @param string|null $teacherCardColor
     * @return Subject
     */
    public function setTeacherCardColor(?string $teacherCardColor): Subject
    {
        $this->teacherCardColor = $teacherCardColor;
        return $this;
    }


    /**
     * @ORM\PrePersist()
     */
    public function prePersist(): void
    {
        if (!$this->teacher->getRole()->hasResource(AclResourceEnum::SUBJECT_TEACHER)) {
            throw new ClientError(ClientErrorType::USER_IS_NOT_TEACHER);
        }

        if ($this->classGroup == null && $this->group == null) {
            throw new ClientError(ClientErrorType::EMPTY_GROUP_CLASS_GROUP);
        }

        if ($this->classGroup && $this->group) {
            throw new ClientError(ClientErrorType::EMPTY_GROUP_CLASS_GROUP);
        }
    }
}
