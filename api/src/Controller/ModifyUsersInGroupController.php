<?php


namespace App\Controller;


use ApiPlatform\Core\Api\IriConverterInterface;
use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\Group;
use App\Entity\IGroup;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ModifyUsersInGroupController extends AbstractController implements MutationResolverInterface
{
    private IriConverterInterface $iriConvertor;

    public function __construct(
        IriConverterInterface $iriConverter
    ) {
        $this->iriConvertor = $iriConverter;
    }

    /**
     * @param IGroup $item
     * @return object|null
     */
    public function __invoke($item, array $context): ?object
    {
        $em = $this->getDoctrine()->getManager();

        $args = $context['args']['input'];
        foreach ($args['addUsers'] as $iri) {
            $user = $em->find(User::class, explode('/', $iri)[1] ?? null);
            if ($user instanceof User) {
                $em->persist($item->addUser($user));
            }
        }

        foreach ($args['deleteUsers'] as $iri) {
            $user = $em->find(User::class, explode('/', $iri)[1] ?? null);
            if ($user instanceof User) {
                $em->persist($item->deleteUser($user));
            }
        }

        $em->persist($item);
        $em->flush();

        return $item;
    }
}
