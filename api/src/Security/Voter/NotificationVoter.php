<?php


namespace App\Security\Voter;


use App\Entity\Notification;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class NotificationVoter extends Voter
{

    private Security $security;

    public function __construct(
        Security $security
    ) {
        $this->security = $security;
    }

    public function supports(string $attribute, $subject)
    {
        return in_array($attribute,
                ['ENTITY_ACCESS']) && $subject instanceof Notification;
    }

    /**
     * @param Notification $subject
     */
    public function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        return $this->security->isGranted('ENTITY_ACCESS', $subject->getUser());
    }
}
