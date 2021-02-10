<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\Notification;
use App\Entity\User;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use App\Helper\IriHelper;
use App\Repository\NotificationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class NotificationController extends AbstractController implements MutationResolverInterface
{

    public function __invoke($item, array $context)
    {
        $em = $this->getDoctrine()->getManager();
        $args = $context['args'] ? $context['args']['input'] : [];
        /** @var User $user */
        $user = $this->getUser();

        if (isset($args['id'])) {
            /** @var Notification $notification */
            $notification = $em->find(Notification::class, IriHelper::getIdFromIri($args['id']));
            if ($notification->getUser()->getId() !== $user->getId()) {
                throw new ClientError(ClientErrorType::ACCESS_DENIED);
            }
            $notification->setViewAt(new \DateTime());
            $em->persist($notification);
        } else {
            /** @var NotificationRepository $notificationRepository */
            $notificationRepository = $em->getRepository(Notification::class);
            $notificationRepository->setAllUnreadNotificationRead($user);
        }
        $em->flush();
        $em->refresh($user);
        return $user;
    }
}
