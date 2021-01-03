<?php


namespace App\Entity;


use App\Entity\Attributes\Tid;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity()
 */
class WebPushSubscribe
{
    use Tid;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User", inversedBy="wepPushSubscribes")
     * @Groups("webPushSubscribe:write")
     */
    private User $user;

    /**
     * @var array
     * @ORM\Column(type="array", length=2000)
     * @Groups("webPushSubscribe:write")
     */
    private array $data = [];

    /**
     * @var \DateTime
     * @ORM\Column(type="datetime")
     */
    public \DateTime $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param User $user
     * @return WebPushSubscribe
     */
    public function setUser(User $user): WebPushSubscribe
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return array
     */
    public function getData(): array
    {
        return $this->data;
    }

    /**
     * @param array $data
     * @return WebPushSubscribe
     */
    public function setData(array $data): WebPushSubscribe
    {
        $this->data = $data;
        return $this;
    }
}
