<?php


namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiFilter;
use App\Entity\Attributes\Tid;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;

/**
 * @ORM\Entity()
 * @ApiFilter(OrderFilter::class, properties={"createdAt": "DESC"})
 * @ApiFilter(ExistsFilter::class, properties={"viewAt"})
 */
class Notification
{
    use Tid;

    /** @var string
     * @Groups({"exposed", "read"})
     * @ORM\Column(type="string")
     */
    private string $type;

    /** @var User
     * @ORM\ManyToOne(targetEntity="User"))
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     * @Groups({"exposed", "read"})
     */
    private User $user;

    /**
     * @var array
     * @ORM\Column(type="array")
     * @Groups({"exposed", "read"})
     */
    private array $parameters = [];

    /** @var \DateTime
     * @Groups({"exposed", "read"})
     * @ORM\Column(type="datetime")
     */
    private \DateTime $createdAt;

    /**
     * @var \DateTime|null
     * @Groups({"exposed", "read"})
     * @ORM\Column(type="datetime", nullable=true)
     */
    private ?\DateTime $viewAt;

    /** @var bool
     * @Groups({"exposed", "read"})
     * @ORM\Column(type="boolean")
     */
    private bool $email = false;


    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }


    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }


    public function setType(string $type): Notification
    {
        $this->type = $type;
        return $this;
    }


    public function getParameters(): array
    {
        return $this->parameters;
    }

    public function setParameters(array $parameters): Notification
    {
        $this->parameters = $parameters;
        return $this;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): Notification
    {
        $this->user = $user;
        return $this;
    }
}
