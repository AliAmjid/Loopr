<?php


namespace App\Entity;


use App\Entity\Attributes\Tid;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity()
 */
class SubjectHasGroup
{
    use Tid;

    /**
     * @var Subject
     * @ORM\ManyToOne(targetEntity="Subject")
     * @Groups({"subjectHasGroup:read", "subjectHasGroup:write"})
     */
    private Subject $subject;

    /**
     * @var Group|null
     * @ORM\ManyToOne(targetEntity="Group")
     * @Groups({"subjectHasGroup:read", "subjectHasGroup:write"})
     */
    private ?Group $group = null;

    /** @var ClassGroup|null
     * @ORM\ManyToOne(targetEntity="ClassGroup")
     * @Groups({"subjectHasGroup:read", "subjectHasGroup:write"})
     */
    private ?ClassGroup $classGroup = null;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User")
     * @Groups({"subjectHasGroup:read", "subjectHasGroup:write"})
     */
    private User $teacher;

    /**
     * SubjectHasGroup constructor.
     * @param Subject $subject
     * @param Group|null $group
     * @param ClassGroup|null $classGroup
     * @param User $teacher
     * @throws ClientError
     */
    public function __construct(Subject $subject, User $teacher, ?Group $group = null, ?ClassGroup $classGroup = null)
    {
        $this->subject = $subject;
        $this->group = $group;
        $this->classGroup = $classGroup;
        $this->teacher = $teacher;
        if ($classGroup == null && $group == null) {
            throw new ClientError(ClientErrorType::EMPTY_GROUP_CLASS_GROUP);
        }
    }


    /**
     * @Groups({"subjectHasGroup:read"})
     */
    public
    function getIGroup(): IGroup
    {
        return $this->group ?? $this->classGroup;
    }

    /**
     * @return Subject
     */
    public
    function getSubject(): Subject
    {
        return $this->subject;
    }

    /**
     * @param Subject $subject
     * @return SubjectHasGroup
     */
    public
    function setSubject(
        Subject $subject
    ): SubjectHasGroup {
        $this->subject = $subject;
        return $this;
    }

    /**
     * @return Group|null
     */
    public
    function getGroup(): ?Group
    {
        return $this->group;
    }

    /**
     * @param Group|null $group
     * @return SubjectHasGroup
     */
    public
    function setGroup(
        ?Group $group
    ): SubjectHasGroup {
        $this->group = $group;
        return $this;
    }

    /**
     * @return ClassGroup|null
     */
    public
    function getClassGroup(): ?ClassGroup
    {
        return $this->classGroup;
    }

    /**
     * @param ClassGroup|null $classGroup
     * @return SubjectHasGroup
     */
    public
    function setClassGroup(
        ?ClassGroup $classGroup
    ): SubjectHasGroup {
        $this->classGroup = $classGroup;
        return $this;
    }

    /**
     * @return User
     */
    public
    function getTeacher(): User
    {
        return $this->teacher;
    }

    /**
     * @param User $teacher
     * @return SubjectHasGroup
     */
    public
    function setTeacher(
        User $teacher
    ): SubjectHasGroup {
        $this->teacher = $teacher;
        return $this;
    }
}
