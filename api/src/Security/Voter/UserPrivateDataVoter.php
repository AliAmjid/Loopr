<?php


namespace App\Security\Voter;


use App\Entity\UserPrivateData;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class UserPrivateDataVoter extends Voter
{
    public function supports(string $attribute, $subject)
    {
        return $attribute = 'ENTITY_ACCESS' && $subject instanceof UserPrivateData;
    }

    /**
     * @param UserPrivateData $subject
     */
    public function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        return $subject->getUser()->getId() === $token->getUser()?->getId();
    }
}
