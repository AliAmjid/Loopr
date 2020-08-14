<?php

namespace App\Command;

use App\Entity\AclResource;
use App\Entity\AclRole;
use App\Enum\AclResourceEnum;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class AclLoadResourcesCommand extends Command {
    private EntityManagerInterface $em;

    public function __construct(
        string $name = null,
        EntityManagerInterface $em) {
        parent::__construct($name);
        $this->em = $em;
    }

    protected static $defaultName = 'acl:load-resources';

    protected function configure() {
        $this
            ->setDescription('Loads resources into database');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {
        $io = new SymfonyStyle($input, $output);
        /** @var AclResource[] $resourceEntities */
        $resourceEntities = [];
        //load all resources to database
        foreach (AclResourceEnum::PROP_UUIDS as $name => $uuid) {
            $entity = $this->createOrGetEntity($uuid, $name);
            $this->em->persist($entity);
            $resourceEntities[$name] = $entity;
        }

        $this->em->flush();

        //set parents
        foreach (AclResourceEnum::PROP_DEPENDENT_ON as $name => $array) {
            $parents = new ArrayCollection();
            $entity = $resourceEntities[$name];
            foreach ($array as $name) {
                $parents->add($resourceEntities[$name]);
            }
            $entity->setDependsOn($parents);
            $this->em->persist($entity);
        }
        $this->em->flush();

        //load also pre-defined roles

        foreach (AclResourceEnum::PROP_DEFAULT_ROLES as $role => $resources) {
            $resourcesCollection = new ArrayCollection();
            foreach ($resources as $name) {
                $resourcesCollection->add($resourceEntities[$name]);
            }
            $role = $this->findOrCreateRole($role);
            $role->setResources($resourcesCollection);
            $this->em->persist($role);
        }
        $this->em->flush();

        $io->success('Database is synced with AclResourceEnum file');
        return 0;
    }


    private function createOrGetEntity(string $uuid, string $name): AclResource {
        /** @var AclResource $entity */
        $entity = $this->em->find(AclResource::class, $uuid);
        if ($entity) {
            $entity->setName($name);
        } else {
            $entity = new AclResource();
            $entity->setName($name);
            $entity->setId($uuid);
        }
        return $entity;
    }

    private function findOrCreateRole(string $name): AclRole {
        $userRepository = $this->em->getRepository(AclRole::class);
        /** @var ?AclRole $role */
        $role = $userRepository->findOneBy(['name' => $name]);
        if ($role) {
            return $role;
        } else {
            $role = new AclRole();
            $role->setName($name);
        }
        return $role;
    }
}
