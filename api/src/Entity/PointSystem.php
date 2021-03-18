<?php


namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Entity\Attributes\Tid;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

/**
 * @ORM\Entity()
 * @ORM\HasLifecycleCallbacks()
 */
class PointSystem extends MarkSystem
{
    use Tid;

    /**
     * @var Exam
     * @ORM\OneToOne(targetEntity="Exam", inversedBy="pointSystem")
     * @Groups({"read", "exposed", "exam:write"})
     * @ORM\JoinColumn(nullable=false, name="exam_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private Exam $exam;

    /**
     * @var int
     * @ORM\Column(type="integer")
     * @Groups({"read", "exposed", "exam:write"})
     */
    private int $maxPoints;

    /** @var Collection|array
     * @ORM\OneToMany(targetEntity="Point", mappedBy="pointSystem")
     * @Groups({"read:always", "exposed", "read"})
     */
    private Collection|array $points;

    public function __construct()
    {
        $this->points = new ArrayCollection();
        $this->id = Uuid::v4();
    }

    public function getMaxPoints(): int
    {
        return $this->maxPoints;
    }

    public function setMaxPoints(int $maxPoints): PointSystem
    {
        $this->maxPoints = $maxPoints;
        return $this;
    }

    public function getPoints(): Collection|array
    {
        return $this->points;
    }

    public function getPointsOnlyWritten(): Collection
    {
        return $this->points->filter(function (Point $point) {
            return $point->isExamWritten();
        });
    }

    public function setPoints(Collection|array $points): PointSystem
    {
        $this->points = $points;
        return $this;
    }

    function getMarkSystemType(): string
    {
        return Subject::EVALUATION_SYSTEM_POINTS;
    }

    public function getExam(): Exam
    {
        return $this->exam;
    }


    public function setExam(Exam $exam): MarkSystem
    {
        $this->exam = $exam;
        return $this;
    }

    /**
     * @Groups({"exposed", "read"})
     * @return int[]
     */
    public function getAnonymizedResults(): iterable
    {
        return array_filter($this->getPointsOnlyWritten()->map(function (Point $point) {
            if ($point->isExamWritten()) {
                return (int)$point->getPoints();
            }
            return null;
        })->toArray());
    }

    /**
     * @Groups({"exposed", "read"})
     */
    public function getAverage(): float
    {
        $results = $this->getAnonymizedResults();
        if (count($results) === 0) {
            return 0;
        }
        return round(array_sum($results) / count($results), 2);
    }
}
