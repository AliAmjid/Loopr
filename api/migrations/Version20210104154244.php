<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210104154244 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE percent_to_mark_convert (id UUID NOT NULL, one INT NOT NULL, two INT NOT NULL, three INT NOT NULL, four INT NOT NULL, sync BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE subject RENAME COLUMN mark_system TO evaluation_system');
        $this->addSql('ALTER TABLE user_private_data ADD default_percent_to_mark_id UUID DEFAULT NULL');
        $this->addSql('ALTER TABLE user_private_data ADD CONSTRAINT FK_BDFDFBDF5D1B57E0 FOREIGN KEY (default_percent_to_mark_id) REFERENCES percent_to_mark_convert (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_BDFDFBDF5D1B57E0 ON user_private_data (default_percent_to_mark_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE user_private_data DROP CONSTRAINT FK_BDFDFBDF5D1B57E0');
        $this->addSql('DROP TABLE percent_to_mark_convert');
        $this->addSql('ALTER TABLE subject RENAME COLUMN evaluation_system TO mark_system');
        $this->addSql('DROP INDEX UNIQ_BDFDFBDF5D1B57E0');
        $this->addSql('ALTER TABLE user_private_data DROP default_percent_to_mark_id');
    }
}
