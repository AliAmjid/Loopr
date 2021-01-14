<?php

namespace App\Command;

use App\Entity\AclResource;
use App\Entity\AclRole;
use App\Entity\User;
use App\Entity\UserPrivateData;
use App\Enum\AclResourceEnum;
use Doctrine\Persistence\ManagerRegistry;
use Nette\Utils\Random;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;

class AclAdminUserCommand extends Command
{

    protected $kernel;
    protected $em;

    protected static $defaultName = 'acl:admin-user';

    public function __construct(
        string $name = null,
        ManagerRegistry $registry,
        KernelInterface $kernel
    ) {
        parent::__construct($name);
        $this->em = $registry->getManager();
        $this->kernel = $kernel;
    }

    protected function configure()
    {
        $this
            ->setDescription('Create user in database')
            ->addArgument('email', InputArgument::REQUIRED, 'email')
            ->addArgument('password', InputArgument::REQUIRED, 'password');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $name = $input->getArgument('email');
        $password = $input->getArgument('password');
        $user = $this->createRandomUser($password, AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_ADMIN'], $name);


        $io->success('login: ' . $user->getEmail());
        $io->success('password: ' . $password);
        $io->success('Generated user');
        return Command::SUCCESS;
    }

    protected function createRandomUser(
        $password = 'test',
        $resources = AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_USER'],
        $email = null
    ): User {
        $user = new User();
        $user->setEmail($email ?? Random::generate(4) . "@loopr.cz");
        $user->setFirstname(Random::generate());
        /** @var UserPasswordEncoder $encoder */
        $encoder = $this->kernel->getContainer()->get('security.password_encoder');
        $user->setPassword($encoder->encodePassword($user, $password));
        $user->setFirstname(Random::generate());
        $user->setLastname(Random::generate());
        $user->setRole($this->createRoleWithResources($resources));
        $user->setPrivateData(new UserPrivateData());
        $this->em->persist($user);
        $this->em->flush();
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
        return $role;
    }

    protected function randomRoleName(): string
    {
        return 'ROLE_' . strtoupper(Random::generate(5, 'a-z'));
    }
}
