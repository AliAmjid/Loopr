<?php


namespace App\Tests\Helpers;


use ApiPlatform\Core\Bridge\Symfony\Routing\IriConverter;
use App\Entity\AclResource;
use App\Entity\AclRole;
use App\Entity\User;
use App\Enum\AclResourceEnum;
use Doctrine\ORM\EntityManagerInterface;
use Nette\Utils\Random;
use Softonic\GraphQL\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;

trait TCreateEntityHelpers
{

    protected $testingEntities = [];
    protected EntityManagerInterface $em;

    protected function createRandomUser(
        $password = 'test',
        $resources = AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_USER']
    ): User {
        $user = new User();
        $user->setEmail(Random::generate(4) . "@test.cz");
        $user->setFirstname(Random::generate());
        /** @var UserPasswordEncoder $encoder */
        $encoder = $this->kernel->getContainer()->get('security.password_encoder');
        $user->setPassword($encoder->encodePassword($user, $password));
        $user->setFirstname(Random::generate());
        $user->setLastname(Random::generate());
        $user->setRole($this->createRoleWithResources($resources));
        $this->em->persist($user);
        $this->em->flush();
        $this->testingEntities[] = $user;
        return $user;
    }


    protected function createRoleWithResources(array $resources)
    {
        $role = new AclRole();
        $role->setName($this->randomRoleName());
        foreach ($resources as $resource) {
            /** @var AclResource $resource */
            $resource = $this->em->find(AclResource::class, AclResourceEnum::PROP_UUIDS[$resource]);
            if ($resource) {
                $role->getResources()->add($resource);
            }
            foreach ($resource->getDependsOn() as $parent) {
                $role->addResource($parent);
            }
        }
        $this->em->persist($role);
        $this->em->flush();
        $this->testingEntities[] = $role;
        return $role;
    }


    protected function deleteAllTestingEntities()
    {
    }

    protected function randomRoleName(): string
    {
        return 'ROLE_' . strtoupper(Random::generate(5, 'a-z'));
    }

}
