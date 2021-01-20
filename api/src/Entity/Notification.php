<?php


namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiFilter;
use App\Entity\Attributes\Tid;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;

/**
 * @ORM\Entity(repositoryClass="App\Repository\NotificationRepository")
 */
#[ApiFilter(filterClass: ExistsFilter::class, properties: ['viewAt' => false])]
#[ApiFilter(filterClass: OrderFilter::class, properties: ['createdAt' => ['default_direction' => 'DESC']])]
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

    /**
     * @return \DateTime
     */
    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $createdAt
     * @return Notification
     */
    public function setCreatedAt(\DateTime $createdAt): Notification
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    /**
     * @return \DateTime|null
     */
    public function getViewAt(): ?\DateTime
    {
        return $this->viewAt;
    }

    /**
     * @param \DateTime|null $viewAt
     * @return Notification
     */
    public function setViewAt(?\DateTime $viewAt): Notification
    {
        $this->viewAt = $viewAt;
        return $this;
    }

    /**
     * @return bool
     */
    public function isEmail(): bool
    {
        return $this->email;
    }

    /**
     * @param bool $email
     * @return Notification
     */
    public function setEmail(bool $email): Notification
    {
        $this->email = $email;
        return $this;
    }
}
