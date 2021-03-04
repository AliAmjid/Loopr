<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\Subject;
use App\Entity\User;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserArchiveController extends AbstractController implements MutationResolverInterface
{
    /**
     * @param User $item
     */
    public function __invoke($item, array $context)
    {
        $em = $this->getDoctrine()->getManager();
        $archive = $context['args']['input']['archive'] ?? false;

        if ($archive === false) {
            if ($item->getArchivedAt() === null) {
                throw new ClientError(ClientErrorType::ALREADY_ACTIVE);
            }
            if ($item->getClassGroup()) {
                if ($item->getClassGroup()->getArchivedAt() !== null) {
                    $item->setClassGroup(null);
                }
                $item->setArchivedAt(null);
                foreach ($item->getGroups() as $group) {
                    if ($group->getArchivedAt() != null) {
                        $item->getGroups()->removeElement($group);
                        $group->deleteUser($item);
                        $em->persist($group);
                    }
                }
            }
        } else {
            if ($item->getArchivedAt() !== null) {
                throw new ClientError(ClientErrorType::ALREADY_ARCHIVED);
            }
            if ($item->getClassGroup() !== null) {
                if ($item->getClassGroup()->getArchivedAt() !== null) {
                    $item->setClassGroup(null);
                }
            }
            foreach ($item->getGroups() as $group) {
                if ($group->getArchivedAt() === null) {
                    $item->getGroups()->removeElement($group);
                    $group->deleteUser($item);
                    $em->persist($group);
                }
            }

            $item->setArchivedAt(new \DateTime());
        }
        $em->persist($item);
        $em->flush();
        return $item;
    }

}
