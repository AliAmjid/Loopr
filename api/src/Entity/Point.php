<?php


namespace App\Entity;


use App\Entity\Attributes\Tid;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity()
 * @UniqueEntity({"user", "pointSystem"})
 */
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
     * @Groups({"read", "exposed", "exam:write"})
     */
    private PointSystem $pointSystem;


    /**
     * @var int
     * @ORM\Column(type="integer")
     * @Groups({"exam:write", "read", "exposed"})
     */
    private int $points;


    /** @var bool
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
