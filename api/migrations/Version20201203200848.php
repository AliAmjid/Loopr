<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201203200848 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user_group');
        $this->addSql('ALTER TABLE subject DROP CONSTRAINT fk_fbce3e7a23edc87');
        $this->addSql('DROP INDEX idx_fbce3e7a23edc87');
        $this->addSql('ALTER TABLE subject RENAME COLUMN subject_id TO subject_type_id');
        $this->addSql('ALTER TABLE subject ADD CONSTRAINT FK_FBCE3E7A60CE2031 FOREIGN KEY (subject_type_id) REFERENCES subject_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_FBCE3E7A60CE2031 ON subject (subject_type_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE user_group (user_id UUID NOT NULL, group_id UUID NOT NULL, PRIMARY KEY(user_id, group_id))');
        $this->addSql('CREATE INDEX idx_8f02bf9dfe54d947 ON user_group (group_id)');
        $this->addSql('CREATE INDEX idx_8f02bf9da76ed395 ON user_group (user_id)');
        $this->addSql('ALTER TABLE user_group ADD CONSTRAINT fk_8f02bf9da76ed395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_group ADD CONSTRAINT fk_8f02bf9dfe54d947 FOREIGN KEY (group_id) REFERENCES "group" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subject DROP CONSTRAINT FK_FBCE3E7A60CE2031');
        $this->addSql('DROP INDEX IDX_FBCE3E7A60CE2031');
        $this->addSql('ALTER TABLE subject RENAME COLUMN subject_type_id TO subject_id');
        $this->addSql('ALTER TABLE subject ADD CONSTRAINT fk_fbce3e7a23edc87 FOREIGN KEY (subject_id) REFERENCES subject_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_fbce3e7a23edc87 ON subject (subject_id)');
    }
}
