<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201130214851 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE subject_has_group (id UUID NOT NULL, subject_id UUID DEFAULT NULL, group_id UUID DEFAULT NULL, class_group_id UUID DEFAULT NULL, teacher_id UUID DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D518C05123EDC87 ON subject_has_group (subject_id)');
        $this->addSql('CREATE INDEX IDX_D518C051FE54D947 ON subject_has_group (group_id)');
        $this->addSql('CREATE INDEX IDX_D518C0514A9A1217 ON subject_has_group (class_group_id)');
        $this->addSql('CREATE INDEX IDX_D518C05141807E1D ON subject_has_group (teacher_id)');
        $this->addSql('ALTER TABLE subject_has_group ADD CONSTRAINT FK_D518C05123EDC87 FOREIGN KEY (subject_id) REFERENCES subject (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subject_has_group ADD CONSTRAINT FK_D518C051FE54D947 FOREIGN KEY (group_id) REFERENCES "group" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subject_has_group ADD CONSTRAINT FK_D518C0514A9A1217 FOREIGN KEY (class_group_id) REFERENCES "class_group" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subject_has_group ADD CONSTRAINT FK_D518C05141807E1D FOREIGN KEY (teacher_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE subject_has_group');
    }
}
