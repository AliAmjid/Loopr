<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use App\Entity\PercentToMarkConvert;
use App\Entity\Subject;
use App\Entity\UserPrivateData;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;
use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Symfony\Component\Uid\Uuid;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210104160738 extends AbstractMigration implements ContainerAwareInterface
{
    use ContainerAwareTrait;

    public function getDescription() : string
    {
        return '';
    }

    public function preUp(Schema $schema): void
    {
        /** @var EntityManager $em */
        $em = $this->container->get('doctrine.orm.entity_manager');
        /** @var UserPrivateData $privateData */
        foreach ($em->getRepository(UserPrivateData::class)->findAll() as $privateData) {
            $privateData->setDefaultPercentToMark($this->createPercentsToMark());
            $em->persist($privateData);
        }
        /** @var Subject $subject */
        foreach ($em->getRepository(Subject::class)->findAll() as $subject) {
            $subject->setPercentsToMarkConvert($this->createPercentsToMark());
            $em->persist($subject);
        }
        $em->flush();
    }

    private function createPercentsToMark() {
        $p = new PercentToMarkConvert();
        $p->setId((string)Uuid::v4());
        return $p;
    }


    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE subject ALTER percents_to_mark_convert_id SET NOT NULL');
        $this->addSql('ALTER TABLE user_private_data ALTER default_percent_to_mark_id SET NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE subject ALTER percents_to_mark_convert_id DROP NOT NULL');
        $this->addSql('ALTER TABLE user_private_data ALTER default_percent_to_mark_id DROP NOT NULL');
    }
}
