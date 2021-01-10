<?php


namespace App\Entity;

use App\Entity\Attributes\Tid;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 */
class PercentToMarkConvert
{
    use Tid;

    /**
     * @var int
     * @ORM\Column(type="integer")
     * @Assert\Range(min="1", max="100")
     * @Groups({"percentToMarkConvert:write", "read", "exposed"})
     */
    private int $one = 75;

    /**
     * @var int
     * @ORM\Column(type="integer")
     * @Assert\Range(min="1", max="100")
     * @Groups({"percentToMarkConvert:write", "read", "exposed"})
     */
    private int $two = 65;

    /**
     * @var int
     * @ORM\Column(type="integer")
     * @Assert\Range(min="1", max="100")
     * @Groups({"percentToMarkConvert:write", "read", "exposed"})
     */
    private int $three = 55;

    /**
     * @var int
     * @ORM\Column(type="integer")
     * @Assert\Range(min="1", max="100")
     * @Groups({"percentToMarkConvert:write", "read", "exposed"})
     */
    private int $four = 45;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    private bool $sync = true;


    /**
     * @var Subject|null
     * @ORM\OneToOne(targetEntity="Subject", mappedBy="percentsToMarkConvert")
     */
    private ?Subject $subject;

    /** @var UserPrivateData|null
     * @ORM\OneToOne(targetEntity="UserPrivateData", mappedBy="defaultPercentToMark")
     */
    private ?UserPrivateData $user;


    public function getOne(): int
    {
        return $this->one;
    }

    public function setOne(int $one): PercentToMarkConvert
    {
        $this->one = $one;
        return $this;
    }

    public function getTwo(): int
    {
        return $this->two;
    }

    public function setTwo(int $two): PercentToMarkConvert
    {
        $this->two = $two;
        return $this;
    }

    public function getThree(): int
    {
        return $this->three;
    }

    public function setThree(int $three): PercentToMarkConvert
    {
        $this->three = $three;
        return $this;
    }

    public function getFour(): int
    {
        return $this->four;
    }

    public function setFour(int $four): PercentToMarkConvert
    {
        $this->four = $four;
        return $this;
    }

    public function getSubject(): ?Subject
    {
        return $this->subject;
    }

    public function setSubject(?Subject $subject): PercentToMarkConvert
    {
        $this->subject = $subject;
        return $this;
    }

    /**
     * @return UserPrivateData|null
     */
    public function getUser(): ?UserPrivateData
    {
        return $this->user;
    }

    /**
     * @param UserPrivateData|null $user
     * @return PercentToMarkConvert
     */
    public function setUser(?UserPrivateData $user): PercentToMarkConvert
    {
        $this->user = $user;
        return $this;
    }


    public function convert(float $percents): int
    {
        if ($percents >= $this->one) {
            return 1;
        }
        if ($percents >= $this->two) {
            return 2;
        }
        if ($percents >= $this->three) {
            return 3;
        }
        if ($percents >= $this->four) {
            return 4;
        }
        return 5;
    }

}
