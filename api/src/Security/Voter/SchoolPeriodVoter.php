<?php


namespace App\Security\Voter;


use App\Entity\SchoolPeriod;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class SchoolPeriodVoter extends Voter
{
    private Security $security;

    public function __construct(
        Security $security
    ) {
        $this->security = $security;
    }


    protected function supports(string $attribute, $subject)
    {
        return in_array($attribute,
                ['ENTITY_ACCESS']) && $subject instanceof SchoolPeriod;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        return true;
    }
}
