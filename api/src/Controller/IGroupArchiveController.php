<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\IGroup;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class IGroupArchiveController extends AbstractController implements MutationResolverInterface
{

    /**
     * @var IGroup $item
     */
    public function __invoke($item, array $context)
    {
        $em = $this->getDoctrine()->getManager();
        $archive = $context['args']['input']['archive'] ?? false;
        if ($archive) {
            if ($item->getArchivedAt() !== null) {
                throw new ClientError(ClientErrorType::ALREADY_ARCHIVED);
            }
            $item->setArchivedAt(new \DateTime());
            foreach ($item->getSubjects() as $subject) {
                if ($subject->getArchivedAt() !== null) {
                    $subject->setArchivedAt(new \DateTime());
                    $em->persist($subject);
                }
            }

            foreach ($item->getUsers() as $user) {
                if ($user->getArchivedAt() !== null) {
                    $user->setArchivedAt(new \DateTime());
                    $em->persist($user);
                }
            }

        } else {
            if ($item->getArchivedAt() === null) {
                throw new ClientError(ClientErrorType::ALREADY_ACTIVE);
            }
            $item->setArchivedAt(null);
            foreach ($item->getSubjects() as $subject) {
                if ($subject->getArchivedAt() !== null) {
                    $subject->setArchivedAt(null);
                    $em->persist($subject);
                }
            }

            foreach ($item->getUsers() as $user) {
                if ($user->getArchivedAt() !== null) {
                    $user->setArchivedAt(null);
                    $em->persist($user);
                }
            }
        }
        $em->persist($item);
        $em->flush();
        return $item;
    }
}
