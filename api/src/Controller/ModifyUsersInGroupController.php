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
        $args = $context['args']['input'];
        foreach ($args['addUsers'] as $iri) {
            $user = $this->getDoctrine()->getManager()->find(User::class, explode('/', $iri)[1]);
            if ($user instanceof User) {
                $this->getDoctrine()
                    ->getManager()
                    ->persist($item->addUser($user));
            }
        }

        foreach ($args['deleteUsers'] as $iri) {
            $user = $this->getDoctrine()->getManager()->find(User::class, explode('/', $iri)[1]);
            if ($user instanceof User) {
                $this->getDoctrine()
                    ->getManager()
                    ->persist($item->deleteUser($user));
            }
        }

        $this->getDoctrine()
            ->getManager()
            ->persist($item);
        $this->getDoctrine()
            ->getManager()
            ->flush();

        return $item;
    }
}
