<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\Subject;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SubjectArchiveController extends AbstractController implements MutationResolverInterface
{
    /**
     * @param Subject $item
     */
    public function __invoke($item, array $context)
    {
        $em = $this->getDoctrine()->getManager();
        $archive = $context['args']['input']['archive'] ?? false;

        if ($archive === false) {
            throw new ClientError(ClientErrorType::CANNOT_BE_DE_ARCHIVED);
        }

        if ($item->getArchivedAt() !== null) {
            throw new ClientError(ClientErrorType::ALREADY_ARCHIVED);
        }

        $item->setArchivedAt(new \DateTime());
        $em->persist($item);
        $em->flush();
        return $item;
    }

}
