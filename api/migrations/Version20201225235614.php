<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use App\Entity\User;
use App\Entity\UserPrivateData;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201225235614 extends AbstractMigration implements ContainerAwareInterface
{
    use ContainerAwareTrait;

    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        /** @var ObjectManager $em */
        $em = $this->container->get('doctrine.orm.entity_manager');
        /** @var User $user */
        foreach ($em->getRepository(User::class)->findAll() as $user) {
            $privateData = new UserPrivateData();
            $privateData->setUser($user);
            $user->setPrivateData(new UserPrivateData());
            $em->persist($privateData);
            $em->persist($user);
        }
        $em->flush();

        $this->addSql('ALTER TABLE "user" ALTER private_data_id SET NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" ALTER private_data_id DROP NOT NULL');
    }
}
