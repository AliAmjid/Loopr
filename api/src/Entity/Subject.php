<?php


namespace App\Entity;


use App\Entity\Attributes\Tid;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 */
class Subject
{
    use Tid;

    /**
     * @var string|null
     * @Assert\NotNull()
     * @Assert\NotBlank()
     * @ORM\Column(type="string", nullable=true)
     * @Groups({"subject:read", "subject:write", "group:read"})
     */
    private string $name;

    /**
     * @return string
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return Subject
     */
    public function setName(string $name): Subject
    {
        $this->name = $name;
        return $this;
    }
}
