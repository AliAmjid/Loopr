<?php


namespace App\Security\Voter;


use App\Entity\WebPushSubscribe;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class WebPushSubscribeVoter extends Voter
{
    public function __construct(
        private Security $security
    ) {
    }

    protected function supports(string $attribute, $subject)
    {
        return $subject instanceof WebPushSubscribe;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        return $subject->getUser()->getId() === $this->security->getUser()->getId();
    }

}
