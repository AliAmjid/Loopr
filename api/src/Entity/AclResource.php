<?php


namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity()
 */
class AclResource
{

    /**
     * @var string
     * @ORM\Id()
     * @ORM\Column(type="guid")
     * @ApiProperty(identifier=true)
     */
    private $id;

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @param string $id
     */
    public function setId(string $id): void
    {
        $this->id = $id;
    }

    /** @var string
     * @Groups({"read","exposed", "aclResource:write"})
     * @ORM\Column(type="string")
     */
    private string $name;


    /**
     * @var Collection|null
     * @Groups({"read", "exposed", "aclResource:write"})
     * @ORM\ManyToMany(targetEntity="AclResource")
     */
    private ?Collection  $dependsOn;

    public function __construct()
    {
        $this->dependsOn = new ArrayCollection();
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
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return Collection|AclResource[]
     */
    public function getDependsOn(): ?Collection
    {
        return $this->dependsOn;
    }

    /**
     * @param Collection|null $dependsOn
     */
    public function setDependsOn(?Collection $dependsOn): void
    {
        $this->dependsOn = $dependsOn;
    }

    public function __toString()
    {
        return $this->name;
    }
}
