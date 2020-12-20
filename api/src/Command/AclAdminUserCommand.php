<?php

namespace App\Command;

use App\Enum\AclResourceEnum;
use App\Tests\Helpers\TCreateEntityHelpers;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\HttpKernel\KernelInterface;

class AclAdminUserCommand extends Command
{
    use TCreateEntityHelpers;

    protected $kernel;

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
}
