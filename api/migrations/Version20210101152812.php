<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210101152812 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE exam DROP CONSTRAINT fk_38bba6c673bb4a8b');
        $this->addSql('DROP INDEX uniq_38bba6c673bb4a8b');
        $this->addSql('ALTER TABLE exam DROP point_system_id');
        $this->addSql('ALTER TABLE point_system ADD exam_id UUID NOT NULL');
        $this->addSql('ALTER TABLE point_system ADD CONSTRAINT FK_A0E8E6F5578D5E91 FOREIGN KEY (exam_id) REFERENCES exam (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A0E8E6F5578D5E91 ON point_system (exam_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE exam ADD point_system_id UUID DEFAULT NULL');
        $this->addSql('ALTER TABLE exam ADD CONSTRAINT fk_38bba6c673bb4a8b FOREIGN KEY (point_system_id) REFERENCES point_system (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_38bba6c673bb4a8b ON exam (point_system_id)');
        $this->addSql('ALTER TABLE point_system DROP CONSTRAINT FK_A0E8E6F5578D5E91');
        $this->addSql('DROP INDEX UNIQ_A0E8E6F5578D5E91');
        $this->addSql('ALTER TABLE point_system DROP exam_id');
    }
}
