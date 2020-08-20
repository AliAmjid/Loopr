<?php


namespace App\Entity;


use App\Entity\Attributes\Tid;
use App\Enum\AclResourceEnum;
use App\Exceptions\InvalidRoleConfiguration;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\HasLifecycleCallbacks()
 */
class AclRole {

    use Tid;

    /** @var string
     * @ORM\Column(type="string")
     * @Groups({"aclRole:write", "aclRole:read"})
     * @Assert\Regex(pattern="/^ROLE_[A-Z]{1,20}$/m",message="WRONG_FORMAT_REGEX_/^ROLE_[A-Z]{1,20}$/")
     */
    private string $name;

    /** @var Collection|AclResource[]
     * @ORM\ManyToMany(targetEntity="AclResource")
     * @Groups({"aclResource:read", "aclResource:write"})
     */
    private Collection $resources;


    public function __construct() {
        $this->resources = new ArrayCollection();
    }

    /**
     * @return string
     */
    public function getName(): string {
        return $this->name;
    }

    /**
     * @return Collection|AclResource[]
     */
    public function getResources(): Collection {
        return $this->resources;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void {
        $this->name = $name;
    }

    /**
     * @param Collection $resources
     */
    public function setResources(Collection $resources): void {
        $this->resources = $resources;
    }

    public function addResource(AclResource $resource) {
        $this->resources[] = $resource;
    }

    public function removeResource(AclResource $resource) {
        $this->resources->removeElement($resource);
    }
    /**
     * ========================= OTHER =========================
     */

    /**
     * @ORM\PrePersist()
     */
    public function prePersist(): void {
        //Validate resources
        if (!$this->areResourcesValid()) {
            throw new InvalidRoleConfiguration();
        }
    }

    private function areResourcesValid(): bool {
        foreach ($this->getResources() as $resource) {
            foreach ($resource->getDependsOn() as $requiredResource) {
                if (!$this->getResources()->contains($requiredResource)) {
                    return false;
                }
            }
        }
        return true;
    }

    public function hasResource(string $resourceName): bool {
        foreach ($this->getResources() as $resource) {
            if ($resource->getName() == true) {
                return true;
            }
        }
        return false;
    }
}