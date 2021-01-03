<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210102211018 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE web_push_subscribe (id UUID NOT NULL, user_id UUID DEFAULT NULL, data TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9E3EAB56A76ED395 ON web_push_subscribe (user_id)');
        $this->addSql('COMMENT ON COLUMN web_push_subscribe.data IS \'(DC2Type:array)\'');
        $this->addSql('ALTER TABLE web_push_subscribe ADD CONSTRAINT FK_9E3EAB56A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE point ALTER user_id SET NOT NULL');
        $this->addSql('ALTER TABLE point ALTER point_system_id SET NOT NULL');
        $this->addSql('ALTER TABLE user_private_data DROP group_modify_notification_email');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE web_push_subscribe');
        $this->addSql('ALTER TABLE point ALTER user_id DROP NOT NULL');
        $this->addSql('ALTER TABLE point ALTER point_system_id DROP NOT NULL');
        $this->addSql('ALTER TABLE user_private_data ADD group_modify_notification_email BOOLEAN NOT NULL');
    }
}
