<?php


namespace App\Entity;


use App\Entity\Attributes\Tid;
use App\Enum\AclResourceEnum;
use App\Error\ClientError;
use App\Error\ClientErrorType;
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
class AclRole
{

    use Tid;

    /** @var string Example format: ROLE_ADMIN.
     * Must start with 'ROLE_' and name cant be longer than 20 letters.
     * (regex: ^ROLE_[A-Z]{1,20}$/m)
     *
     * @ORM\Column(type="string")
     * @Groups({"aclRole:write", "exposed", "read"})
     * @Assert\Regex(pattern="/^ROLE_[A-Z]{1,20}$/m",message="INVALID_ROLE_NAME")
     */
    private string $name;

    /** @var Collection|AclResource[] Must be an array IRIs (acl_resources/<uuid>) of existing resources
     * @ORM\ManyToMany(targetEntity="AclResource")
     * @Groups({"read", "exposed", "aclResource:write"})
     */
    private Collection $resources;


    public function __construct()
    {
        $this->resources = new ArrayCollection();
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return Collection|AclResource[]
     */
    public function getResources(): Collection
    {
        return $this->resources;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @param Collection $resources
     */
    public function setResources(Collection $resources): void
    {
        $this->resources = $resources;
    }

    public function addResource(AclResource $resource)
    {
        $this->resources[] = $resource;
    }

    public function removeResource(AclResource $resource)
    {
        $this->resources->removeElement($resource);
    }

    /**
     * ========================= OTHER =========================
     */

    /**
     * @ORM\PrePersist()
     */
    public function prePersist(): void
    {
        //Validate resources
        if (!$this->areResourcesValid()) {
            throw new ClientError(ClientErrorType::INVALID_ROLE_CONFIG);
        }
    }

    private function areResourcesValid(): bool
    {
        foreach ($this->getResources() as $resource) {
            foreach ($resource->getDependsOn() as $requiredResource) {
                if (!$this->getResources()->contains($requiredResource)) {
                    return false;
                }
            }
        }
        return true;
    }

    public function hasResource(string $resourceName): bool
    {
        foreach ($this->getResources() as $resource) {
            if ($resource->getName() == $resourceName) {
                return true;
            }
        }
        return false;
    }
}
