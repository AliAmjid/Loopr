<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201225235543 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_private_data (id UUID NOT NULL, tour_homepage BOOLEAN NOT NULL, tour_class_group BOOLEAN NOT NULL, tour_group BOOLEAN NOT NULL, tour_create_users BOOLEAN NOT NULL, dark_mode BOOLEAN NOT NULL, new_mark_notification_email BOOLEAN NOT NULL, group_modify_notification_email BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE "user" ADD private_data_id UUID DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D649C60C6DD8 FOREIGN KEY (private_data_id) REFERENCES user_private_data (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649C60C6DD8 ON "user" (private_data_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D649C60C6DD8');
        $this->addSql('DROP TABLE user_private_data');
        $this->addSql('DROP INDEX UNIQ_8D93D649C60C6DD8');
        $this->addSql('ALTER TABLE "user" DROP private_data_id');
    }
}
