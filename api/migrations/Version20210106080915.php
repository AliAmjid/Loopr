<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210106080915 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE point_system DROP CONSTRAINT FK_A0E8E6F5578D5E91');
        $this->addSql('ALTER TABLE point_system ADD CONSTRAINT FK_A0E8E6F5578D5E91 FOREIGN KEY (exam_id) REFERENCES exam (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE point_system DROP CONSTRAINT fk_a0e8e6f5578d5e91');
        $this->addSql('ALTER TABLE point_system ADD CONSTRAINT fk_a0e8e6f5578d5e91 FOREIGN KEY (exam_id) REFERENCES exam (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
