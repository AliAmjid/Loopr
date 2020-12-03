<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201203193542 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE subject_type (id UUID NOT NULL, name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE subject_has_group');
        $this->addSql('ALTER TABLE subject ADD subject_id UUID DEFAULT NULL');
        $this->addSql('ALTER TABLE subject ADD group_id UUID DEFAULT NULL');
        $this->addSql('ALTER TABLE subject ADD class_group_id UUID DEFAULT NULL');
        $this->addSql('ALTER TABLE subject ADD teacher_id UUID DEFAULT NULL');
        $this->addSql('ALTER TABLE subject DROP name');
        $this->addSql('ALTER TABLE subject ADD CONSTRAINT FK_FBCE3E7A23EDC87 FOREIGN KEY (subject_id) REFERENCES subject_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subject ADD CONSTRAINT FK_FBCE3E7AFE54D947 FOREIGN KEY (group_id) REFERENCES "group" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subject ADD CONSTRAINT FK_FBCE3E7A4A9A1217 FOREIGN KEY (class_group_id) REFERENCES "class_group" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subject ADD CONSTRAINT FK_FBCE3E7A41807E1D FOREIGN KEY (teacher_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_FBCE3E7A23EDC87 ON subject (subject_id)');
        $this->addSql('CREATE INDEX IDX_FBCE3E7AFE54D947 ON subject (group_id)');
        $this->addSql('CREATE INDEX IDX_FBCE3E7A4A9A1217 ON subject (class_group_id)');
        $this->addSql('CREATE INDEX IDX_FBCE3E7A41807E1D ON subject (teacher_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE subject DROP CONSTRAINT FK_FBCE3E7A23EDC87');
        $this->addSql('CREATE TABLE subject_has_group (id UUID NOT NULL, subject_id UUID DEFAULT NULL, group_id UUID DEFAULT NULL, class_group_id UUID DEFAULT NULL, teacher_id UUID DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_d518c05141807e1d ON subject_has_group (teacher_id)');
        $this->addSql('CREATE INDEX idx_d518c051fe54d947 ON subject_has_group (group_id)');
        $this->addSql('CREATE INDEX idx_d518c0514a9a1217 ON subject_has_group (class_group_id)');
        $this->addSql('CREATE INDEX idx_d518c05123edc87 ON subject_has_group (subject_id)');
        $this->addSql('ALTER TABLE subject_has_group ADD CONSTRAINT fk_d518c05123edc87 FOREIGN KEY (subject_id) REFERENCES subject (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subject_has_group ADD CONSTRAINT fk_d518c051fe54d947 FOREIGN KEY (group_id) REFERENCES "group" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subject_has_group ADD CONSTRAINT fk_d518c0514a9a1217 FOREIGN KEY (class_group_id) REFERENCES class_group (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subject_has_group ADD CONSTRAINT fk_d518c05141807e1d FOREIGN KEY (teacher_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE subject_type');
        $this->addSql('ALTER TABLE subject DROP CONSTRAINT FK_FBCE3E7AFE54D947');
        $this->addSql('ALTER TABLE subject DROP CONSTRAINT FK_FBCE3E7A4A9A1217');
        $this->addSql('ALTER TABLE subject DROP CONSTRAINT FK_FBCE3E7A41807E1D');
        $this->addSql('DROP INDEX IDX_FBCE3E7A23EDC87');
        $this->addSql('DROP INDEX IDX_FBCE3E7AFE54D947');
        $this->addSql('DROP INDEX IDX_FBCE3E7A4A9A1217');
        $this->addSql('DROP INDEX IDX_FBCE3E7A41807E1D');
        $this->addSql('ALTER TABLE subject ADD name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE subject DROP subject_id');
        $this->addSql('ALTER TABLE subject DROP group_id');
        $this->addSql('ALTER TABLE subject DROP class_group_id');
        $this->addSql('ALTER TABLE subject DROP teacher_id');
    }
}
