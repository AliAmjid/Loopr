<?php


namespace App\Tests\Helpers;


use App\Entity\User;
use Nette\Utils\Random;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;

trait TCreateEntityHelpers {

    protected $testingEntities = [];

    protected function createRandomUser($password = 'test', $roles = ['ROLE_USER']): User {
        $user = new User();
        $user->setUsername(Random::generate(4) . "@test.cz");
        $user->setName(Random::generate());
        /** @var UserPasswordEncoder $encoder */
        $encoder = $this->kernel->getContainer()->get('security.password_encoder');
        $user->setPassword($encoder->encodePassword($user, $password));
        $user->setName(Random::generate());
        $user->setRoles($roles);
        $this->em->persist($user);
        $this->em->flush();
        $this->testingEntities[] = $user;
        return $user;
    }


    protected function deleteAllTestingEntities() {
        echo PHP_EOL . '[INFO] DELETING ALL CREATED ENTITIES' . PHP_EOL;
        foreach ($this->testingEntities as $entity) {
            $this->em->remove($entity);
        }
        $this->em->flush();
    }
}
