<?php


namespace App\Entity\Attributes;


use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

trait Tid
{
    /**
     * @var ?string
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Id()
     * @ORM\Column(type="guid")
     * @ApiProperty(identifier=true)
     * @Groups({"read", "exposed", "id", "read:always"})
     */
    private ?string $id;

    /**
     * @return string
     */
    public function getId(): ?string
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
}
