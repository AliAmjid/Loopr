<?php


namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\ORM\Mapping as ORM;

trait Tid {
    /**
     * @var string
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Id()
     * @ORM\Column(type="guid")
     * @ApiProperty(identifier=true)
     */
    private $id;

    /**
     * @return string
     */
    public function getId(): string {
        return $this->id;
    }

    /**
     * @param string $id
     */
    public function setId(string $id): void {
        $this->id = $id;
    }
}
