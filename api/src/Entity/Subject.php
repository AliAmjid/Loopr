<?php


namespace App\Entity;


use App\Entity\Attributes\Tid;
use App\Enum\AclResourceEnum;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity()
 */
class Subject
{
    use Tid;

    /**
     * @var SubjectType
     * @ORM\ManyToOne(targetEntity="SubjectType")
     * @Groups({"read", "exposed", "subject:create"})
     */
    private $subjectType;

    /**
     * @var Group|null
     * @ORM\ManyToOne(targetEntity="Group", inversedBy="subjects")
     * @Groups({"read", "exposed", "subject:write", "group:read"})
     */
    private ?Group $group = null;

    /** @var ClassGroup|null
     * @ORM\ManyToOne(targetEntity="ClassGroup", inversedBy="subjects")
     * @Groups({"read", "exposed", "subject:write"})
     */
    private ?ClassGroup $classGroup = null;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User")
     * @Groups({"read", "exposed", "subject:write"})
     */
    private User $teacher;

    /**
     * subject constructor.
     * @param SubjectType $subjectType
     * @param User $teacher
     * @param Group|null $group
     * @param ClassGroup|null $classGroup
     * @throws ClientError
     */
    public function __construct(
        SubjectType $subjectType,
        User $teacher,
        ?Group $group = null,
        ?ClassGroup $classGroup = null
    ) {
        $this->subjectType = $subjectType;
        $this->group = $group;
        $this->classGroup = $classGroup;
        $this->teacher = $teacher;
        if (!$teacher->getRole()->hasResource(AclResourceEnum::SUBJECT_TEACHER)) {
            throw new ClientError(ClientErrorType::USER_IS_NOT_TEACHER);
        }

        if ($classGroup == null && $group == null) {
            throw new ClientError(ClientErrorType::EMPTY_GROUP_CLASS_GROUP);
        }

        if ($classGroup && $group) {
            throw new ClientError(ClientErrorType::EMPTY_GROUP_CLASS_GROUP);
        }
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
     * @param Group|null $group
     * @return Subject
     */
    public function setGroup(
        ?Group $group
    ): Subject {
        $this->group = $group;
        return $this;
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
}
