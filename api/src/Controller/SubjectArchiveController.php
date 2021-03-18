<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\Subject;
use App\Enum\AclResourceEnum;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class SubjectArchiveController extends AbstractController implements MutationResolverInterface
{
    public function __construct(
        private Security $security
    ) {
    }

    /**
     * @param Subject $item
     */
    public function __invoke($item, array $context)
    {
        if (!$this->security->isGranted(AclResourceEnum::SUBJECT_EDIT)) {
            throw new ClientError(ClientErrorType::ACCESS_DENIED);
        }

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
