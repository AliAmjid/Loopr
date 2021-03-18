<?php


namespace App\Controller;


use ApiPlatform\Core\Api\IriConverterInterface;
use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\Group;
use App\Entity\IGroup;
use App\Entity\User;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use App\Helper\IriHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class ModifyUsersInGroupController extends AbstractController implements MutationResolverInterface
{
    private IriConverterInterface $iriConvertor;

    public function __construct(
        IriConverterInterface $iriConverter,
        private Security $security
    ) {
        $this->iriConvertor = $iriConverter;
    }

    /**
     * @param IGroup $item
     * @return object|null
     */
    public function __invoke($item, array $context): ?object
    {
        if (!$this->security->isGranted('GROUP_EDIT')) {
            throw new ClientError(ClientErrorType::ACCESS_DENIED);
        }

        $em = $this->getDoctrine()->getManager();

        $args = $context['args']['input'];
        foreach ($args['addUsers'] as $iri) {
            $id = IriHelper::getIdFromIri($iri);
            $user = $em->find(User::class, $id);
            if ($user instanceof User) {
                $em->persist($item->addUser($user));
            }
        }

        foreach ($args['deleteUsers'] as $iri) {
            $id = IriHelper::getIdFromIri($iri);
            $user = $em->find(User::class, $id);
            if ($user instanceof User) {
                $em->persist($item->deleteUser($user));
            }
        }

        $em->persist($item);
        $em->flush();

        return $item;
    }
}
