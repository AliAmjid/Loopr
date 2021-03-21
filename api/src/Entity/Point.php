<?php


namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;
use App\Entity\Attributes\Tid;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity()
 * @UniqueEntity({"user", "pointSystem"})
 * @ORM\HasLifecycleCallbacks()
 */
#[ApiFilter(filterClass: ExistsFilter::class, properties: [
    'user.archivedAt' => false
])]
class Point
{
    use Tid;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User")
     * @Groups({"exam:write", "read", "exposed"})
     * @ORM\JoinColumn(nullable=false)
     */
    private User $user;

    /**
     * @var PointSystem
     * @ORM\ManyToOne(targetEntity="PointSystem", inversedBy="points")
     * @ORM\JoinColumn(onDelete="CASCADE", nullable=false)
     * @Groups({"read", "exposed"})
     */
    private PointSystem $pointSystem;


    /**
     * @var int
     * @ORM\Column(type="integer")
     * @Groups({"exam:write", "read", "exposed"})
     */
    private int $points;


    /**
     * @var bool
     * @ORM\Column(type="boolean")
     * @Groups({"exam:write", "read", "exposed"})
     */
    private bool $examWritten = true;

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): Point
    {
        $this->user = $user;
        return $this;
    }

    public function getPointSystem(): PointSystem
    {
        return $this->pointSystem;
    }

    public function setPointSystem(PointSystem $pointSystem): Point
    {
        $this->pointSystem = $pointSystem;
        return $this;
    }

    public function getPoints(): int
    {
        return $this->points;
    }

    public function setPoints(int $points): Point
    {
        $this->points = $points;
        return $this;
    }

    public function isExamWritten(): bool
    {
        return $this->examWritten;
    }

    public function setExamWritten(bool $examWritten): Point
    {
        $this->examWritten = $examWritten;
        return $this;
    }

    /**
     * @Groups({"read", "exposed"})
     */
    public function getBetterThan(): int
    {
        return $this->getPointSystem()->getPointsOnlyWritten()->filter(function (Point $point) {
            return ($point->getId() !== $this->id && $point->getPoints() <= $this->points);
        })->count();
    }

    /**
     * @return int
     * @Groups({"read", "exposed"})
     */
    public function getWorstThan(): int
    {
        return $this->getPointSystem()->getPointsOnlyWritten()->filter(function (Point $point) {
            return ($point->getId() !== $this->id && $point->getPoints() > $this->points);
        })->count();
    }

    /**
     * @Groups({"read", "exposed"})
     */
    public function getPercentil(): float
    {
        if ($this->pointSystem->getPointsOnlyWritten()->count() < 1) {
            return 100;
        }

        return round(100 / $this->pointSystem->getPointsOnlyWritten()->count() * $this->getBetterThan(), 2);
    }

    /**
     * @Groups({"read", "exposed"})
     */
    public function getPercents()
    {
        return round($this->pointSystem->getMaxPoints() / 100 * $this->points, 2);
    }

    /**
     * @Groups({"read", "exposed"})
     */
    public function getConvertedToMark(): int
    {
        return $this->pointSystem->getExam()->getSubject()->getPercentsToMarkConvert()->convert($this->getPercents());
    }

    /**
     * @ORM\PrePersist()
     */
    public function assert()
    {
        if (!$this->getPointSystem()->getExam()->getSubject()->getIGroup()->isUserMember($this->getUser())) {
            throw new ClientError(ClientErrorType::USER_NOT_EXAM_MEMBER);
        }
    }
}
