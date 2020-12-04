<?php


namespace App\Entity;


use App\Entity\Attributes\Tid;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 */
class SubjectType
{
    use Tid;

    /**
     * @var string
     * @Assert\NotNull()
     * @Assert\NotBlank()
     * @ORM\Column(type="string")
     * @Groups({"read", "exposed", "subjectType:write"})
     */
    private string $name;


    /** @var Collection
     * @Groups({"read", "exposed"})
     * @ORM\OneToMany(targetEntity="Subject", mappedBy="subject")
     */
    private Collection $subjects;

    public function __construct()
    {
        $this->subjects = new ArrayCollection();
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
     * @return SubjectType
     */
    public function setName(string $name): SubjectType
    {
        $this->name = $name;
        return $this;
    }
}
