<?php


namespace App\Security\Voter;


use App\Entity\AclResource;
use App\Entity\AclRole;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class AclVoter extends Voter
{
    public function supports(string $attribute, $subject)
    {
        return $subject instanceof AclRole || $subject instanceof AclResource;
    }

    public function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        return true;
    }
}
