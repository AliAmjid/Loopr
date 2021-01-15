<?php


namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Entity\Attributes\Tid;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SchoolPeriodRepository")
 * @UniqueEntity({"quarter", "schoolYear"})
 */
#[ApiFilter(filterClass: SearchFilter::class, properties: [
    'id' => 'exact',
    'schoolYear' => 'exact',
    'quarter' => 'exact'
])]
#[ApiFilter(filterClass: OrderFilter::class, properties: [
    "schoolYear" => "DESC",
    "quarter" => "ASC"
])]
class SchoolPeriod
{
    use Tid;

    /**
     * @var int quarter of year from 1 to 4
     * @ORM\Column(type="integer")
     * @Groups({"exposed", "read", "schoolPeriod:write"})
     * @Assert\Range(min="1", max="4")
     */
    private int $quarter;
    /**
     *
     * @var \DateTime from when quarter is started
     * @ORM\Column(type="datetime", name="""from""")
     * @Groups({"exposed", "read", "schoolPeriod:write"})
     */
    private \DateTime $from;

    /**
     * @var \DateTime when quarter ends
     * @ORM\Column(type="datetime", name="""to""")
     * @Groups({"exposed", "read", "schoolPeriod:write"})
     */
    private \DateTime $to;

    /**
     * @var int 1st year of school (ex. 2020/21 so school year will be 2020)
     * @ORM\Column(type="integer", unique=false)
     * @Groups({"exposed", "read", "schoolPeriod:write"})
     * @Assert\Length(max="4", min="4")
     */
    private int $schoolYear;

    public function getQuarter(): string
    {
        return $this->quarter;
    }

    public function setQuarter(string $quarter): SchoolPeriod
    {
        $this->quarter = $quarter;
        return $this;
    }

    public function getFrom(): \DateTime
    {
        return $this->from;
    }

    public function setFrom(\DateTime $from): SchoolPeriod
    {
        $this->from = $from;
        return $this;
    }

    public function getTo(): \DateTime
    {
        return $this->to;
    }

    public function setTo(\DateTime $to): SchoolPeriod
    {
        $this->to = $to;
        return $this;
    }

    public function getSchoolYear(): int
    {
        return $this->schoolYear;
    }

    public function setSchoolYear(int $schoolYear): SchoolPeriod
    {
        $this->schoolYear = $schoolYear;
        return $this;
    }
}
