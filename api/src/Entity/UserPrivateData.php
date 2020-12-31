<?php


namespace App\Entity;


use App\Entity\Attributes\Tid;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity()
 */
class UserPrivateData
{
    use Tid;

    /** @var User
     * @ORM\OneToOne(targetEntity="User", mappedBy="privateData")
     */
    private User $user;


    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:owner", "exposed", "UserPrivateData:write"})
     */
    private bool $tourHomepage = false;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:owner", "exposed", "UserPrivateData:write"})
     */
    private bool $tourClassGroup = false;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:owner", "exposed", "UserPrivateData:write"})
     */
    private bool $tourGroup = false;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:owner", "exposed", "UserPrivateData:write"})
     */
    private bool $tourCreateUsers = false;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:owner", "exposed", "UserPrivateData:write"})
     */
    private bool $darkMode = false;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:owner", "exposed", "UserPrivateData:write"})
     */
    private bool $newMarkNotificationEmail = false;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:owner", "exposed", "UserPrivateData:write"})
     */
    private bool $groupModifyNotificationEmail = false;


    #[Pure]
    public function __construct()
    {
        $this->notifications = new ArrayCollection();
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
     * @return UserPrivateData
     */
    public function setUser(User $user): UserPrivateData
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return bool
     */
    public function isTourHomepage(): bool
    {
        return $this->tourHomepage;
    }

    /**
     * @param bool $tourHomepage
     * @return UserPrivateData
     */
    public function setTourHomepage(bool $tourHomepage): UserPrivateData
    {
        $this->tourHomepage = $tourHomepage;
        return $this;
    }

    /**
     * @return bool
     */
    public function isTourClassGroup(): bool
    {
        return $this->tourClassGroup;
    }

    /**
     * @param bool $tourClassGroup
     * @return UserPrivateData
     */
    public function setTourClassGroup(bool $tourClassGroup): UserPrivateData
    {
        $this->tourClassGroup = $tourClassGroup;
        return $this;
    }

    /**
     * @return bool
     */
    public function isTourGroup(): bool
    {
        return $this->tourGroup;
    }

    /**
     * @param bool $tourGroup
     * @return UserPrivateData
     */
    public function setTourGroup(bool $tourGroup): UserPrivateData
    {
        $this->tourGroup = $tourGroup;
        return $this;
    }

    /**
     * @return bool
     */
    public function isTourCreateUsers(): bool
    {
        return $this->tourCreateUsers;
    }

    /**
     * @param bool $tourCreateUsers
     * @return UserPrivateData
     */
    public function setTourCreateUsers(bool $tourCreateUsers): UserPrivateData
    {
        $this->tourCreateUsers = $tourCreateUsers;
        return $this;
    }

    /**
     * @return bool
     */
    public function isDarkMode(): bool
    {
        return $this->darkMode;
    }

    /**
     * @param bool $darkMode
     * @return UserPrivateData
     */
    public function setDarkMode(bool $darkMode): UserPrivateData
    {
        $this->darkMode = $darkMode;
        return $this;
    }

    /**
     * @return bool
     */
    public function isNewMarkNotificationEmail(): bool
    {
        return $this->newMarkNotificationEmail;
    }

    /**
     * @param bool $newMarkNotificationEmail
     * @return UserPrivateData
     */
    public function setNewMarkNotificationEmail(bool $newMarkNotificationEmail): UserPrivateData
    {
        $this->newMarkNotificationEmail = $newMarkNotificationEmail;
        return $this;
    }

    /**
     * @return bool
     */
    public function isGroupModifyNotificationEmail(): bool
    {
        return $this->groupModifyNotificationEmail;
    }

    /**
     * @param bool $groupModifyNotificationEmail
     * @return UserPrivateData
     */
    public function setGroupModifyNotificationEmail(bool $groupModifyNotificationEmail): UserPrivateData
    {
        $this->groupModifyNotificationEmail = $groupModifyNotificationEmail;
        return $this;
    }
}
