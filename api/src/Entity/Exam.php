<?php


namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Annotation\InjectDateTime;
use App\Annotation\InjectLoggedUser;
use App\Annotation\InjectSchoolPeriod;
use App\Entity\Attributes\Tid;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

/**
 * @ORM\Entity()
 * @ApiFilter(OrderFilter::class, properties={"createdAt": {"default_direction": "DESC"}})
 * @ORM\HasLifecycleCallbacks()
 */
class Exam
{
    use Tid;

    /** @var string
     * @ORM\Column(type="string")
     * @Assert\Length(max="255")
     * @Groups({"read", "exposed", "exam:write"})
     */
    private string $name;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User")
     */
    private User $createdBy;

    /** @var \DateTime
     * @ORM\Column(type="datetime")
     * @Groups({"exposed", "read"})
     */
    private \DateTime $createdAt;

    /**
     * @var SchoolPeriod
     * @ORM\ManyToOne(targetEntity="SchoolPeriod")
     * @Groups({"exposed", "read"})
     */
    private SchoolPeriod $schoolPeriod;

    /**
     * @var Subject
     * @ORM\ManyToOne(targetEntity="Subject", inversedBy="exams")
     * @Groups({"exposed", "read", "exam:write"})
     */
    private Subject $subject;

    /**
     * @var PointSystem|null
     * @ORM\OneToOne(targetEntity="PointSystem", mappedBy="exam")
     * @Groups({"exposed", "read"})
     * @ApiSubresource()
     */
    private ?PointSystem $pointSystem;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return Exam
     */
    public function setName(string $name): Exam
    {
        $this->name = $name;
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
     */
    public function setCreatedBy(User $createdBy): Exam
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
     */
    public function setCreatedAt(\DateTime $createdAt): Exam
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getSchoolPeriod(): SchoolPeriod
    {
        return $this->schoolPeriod;
    }

    #[InjectSchoolPeriod(["create"])]
    public function setSchoolPeriod(
        SchoolPeriod $schoolPeriod
    ): Exam {
        $this->schoolPeriod = $schoolPeriod;
        return $this;
    }

    /**
     * @return Subject
     */
    public function getSubject(): Subject
    {
        return $this->subject;
    }

    /**
     * @param Subject $subject
     * @return Exam
     */
    public function setSubject(Subject $subject): Exam
    {
        $this->subject = $subject;
        return $this;
    }

    /**
     * @return PointSystem|null
     */
    public function getPointSystem(): ?PointSystem
    {
        return $this->pointSystem;
    }

    /**
     * @param PointSystem|null $pointSystem
     * @return Exam
     */
    public function setPointSystem(?PointSystem $pointSystem): Exam
    {
        $this->pointSystem = $pointSystem;
        return $this;
    }
}
