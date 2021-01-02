<?php


namespace App\Controller;


use ApiPlatform\Core\Api\IriConverterInterface;
use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\Point;
use App\Entity\PointSystem;
use App\Entity\User;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use App\Helper\IriHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PointSystemController extends AbstractController implements MutationResolverInterface
{

    public function __construct(
        private IriConverterInterface $iriConverter
    ) {
    }

    public function __invoke($item, array $context)
    {
        $points = $context['args']['input']['points'];
        $em = $this->getDoctrine()->getManager();
        $pointRepository = $this->getDoctrine()->getRepository(Point::class);
        $pointSystemRepository = $this->getDoctrine()->getRepository(PointSystem::class);
        /** @var PointSystem $pointSystem */
        $pointSystem = $item;
        $ptEntity = $pointSystemRepository->findOneBy(['exam' => $pointSystem->getExam()->getId()]);
        if ($ptEntity) {
            $pointSystem = $ptEntity;
        } else {
            $pointSystem = $item;
        }

        $em->persist($pointSystem);

        foreach ($points as $pointArray) {
            /** @var User $user */
            $user = $em->find(User::class, IriHelper::getIdFromIri($pointArray['user']));
            if (!$user) {
                throw new ClientError(ClientErrorType::INVALID_IRI);
            }
            //find point if exists
            /** @var Point $point */
            $point = $pointRepository->findOneBy(['user' => $user->getId(), 'pointSystem' => $pointSystem->getId()]);
            if ($point == null) {
                $point = new Point();
                $point->setPointSystem($pointSystem);
                $point->setUser($user);
                $em->persist($point);
            }
            $point->setPoints($pointArray['points']);
        }
        $em->flush();
        $em->refresh($pointSystem);
        return $pointSystem;
    }
}
