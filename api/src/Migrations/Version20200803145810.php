<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200803145810 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE TABLE acl_resource (id UUID NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE acl_resource_acl_resource (acl_resource_source UUID NOT NULL, acl_resource_target UUID NOT NULL, PRIMARY KEY(acl_resource_source, acl_resource_target))');
        $this->addSql('CREATE INDEX IDX_54879E28BC0C056 ON acl_resource_acl_resource (acl_resource_source)');
        $this->addSql('CREATE INDEX IDX_54879E2922590D9 ON acl_resource_acl_resource (acl_resource_target)');
        $this->addSql('CREATE TABLE acl_role (id UUID NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE acl_role_acl_resource (acl_role_id UUID NOT NULL, acl_resource_id UUID NOT NULL, PRIMARY KEY(acl_role_id, acl_resource_id))');
        $this->addSql('CREATE INDEX IDX_37605BD6BD33296F ON acl_role_acl_resource (acl_role_id)');
        $this->addSql('CREATE INDEX IDX_37605BD6E4B9BD0F ON acl_role_acl_resource (acl_resource_id)');
        $this->addSql('ALTER TABLE acl_resource_acl_resource ADD CONSTRAINT FK_54879E28BC0C056 FOREIGN KEY (acl_resource_source) REFERENCES acl_resource (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE acl_resource_acl_resource ADD CONSTRAINT FK_54879E2922590D9 FOREIGN KEY (acl_resource_target) REFERENCES acl_resource (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE acl_role_acl_resource ADD CONSTRAINT FK_37605BD6BD33296F FOREIGN KEY (acl_role_id) REFERENCES acl_role (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE acl_role_acl_resource ADD CONSTRAINT FK_37605BD6E4B9BD0F FOREIGN KEY (acl_resource_id) REFERENCES acl_resource (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE acl_resource_acl_resource DROP CONSTRAINT FK_54879E28BC0C056');
        $this->addSql('ALTER TABLE acl_resource_acl_resource DROP CONSTRAINT FK_54879E2922590D9');
        $this->addSql('ALTER TABLE acl_role_acl_resource DROP CONSTRAINT FK_37605BD6E4B9BD0F');
        $this->addSql('ALTER TABLE acl_role_acl_resource DROP CONSTRAINT FK_37605BD6BD33296F');
        $this->addSql('DROP TABLE acl_resource');
        $this->addSql('DROP TABLE acl_resource_acl_resource');
        $this->addSql('DROP TABLE acl_role');
        $this->addSql('DROP TABLE acl_role_acl_resource');
    }
}
