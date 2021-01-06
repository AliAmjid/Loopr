<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210101002909 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE exam (id UUID NOT NULL, created_by_id UUID DEFAULT NULL, school_period_id UUID DEFAULT NULL, subject_id UUID DEFAULT NULL, point_system_id UUID DEFAULT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_38BBA6C6B03A8386 ON exam (created_by_id)');
        $this->addSql('CREATE INDEX IDX_38BBA6C69DC4B963 ON exam (school_period_id)');
        $this->addSql('CREATE INDEX IDX_38BBA6C623EDC87 ON exam (subject_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_38BBA6C673BB4A8B ON exam (point_system_id)');
        $this->addSql('CREATE TABLE point (id UUID NOT NULL, user_id UUID DEFAULT NULL, point_system_id UUID DEFAULT NULL, points INT NOT NULL, exam_written BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B7A5F324A76ED395 ON point (user_id)');
        $this->addSql('CREATE INDEX IDX_B7A5F32473BB4A8B ON point (point_system_id)');
        $this->addSql('CREATE TABLE point_system (id UUID NOT NULL, max_points INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE exam ADD CONSTRAINT FK_38BBA6C6B03A8386 FOREIGN KEY (created_by_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE exam ADD CONSTRAINT FK_38BBA6C69DC4B963 FOREIGN KEY (school_period_id) REFERENCES school_period (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE exam ADD CONSTRAINT FK_38BBA6C623EDC87 FOREIGN KEY (subject_id) REFERENCES subject (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE exam ADD CONSTRAINT FK_38BBA6C673BB4A8B FOREIGN KEY (point_system_id) REFERENCES point_system (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE point ADD CONSTRAINT FK_B7A5F324A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE point ADD CONSTRAINT FK_B7A5F32473BB4A8B FOREIGN KEY (point_system_id) REFERENCES point_system (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subject ADD mark_system VARCHAR(255) DEFAULT \'POINTS\' NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE exam DROP CONSTRAINT FK_38BBA6C673BB4A8B');
        $this->addSql('ALTER TABLE point DROP CONSTRAINT FK_B7A5F32473BB4A8B');
        $this->addSql('DROP TABLE exam');
        $this->addSql('DROP TABLE point');
        $this->addSql('DROP TABLE point_system');
        $this->addSql('ALTER TABLE subject DROP mark_system');
    }
}
