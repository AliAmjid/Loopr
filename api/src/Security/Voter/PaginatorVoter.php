<?php


namespace App\Security\Voter;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;
use App\Entity\SubjectType;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class PaginatorVoter extends Voter
{
    protected function supports(string $attribute, $subject)
    {
        return $attribute === 'ENTITY_ACCESS' && $subject instanceof Paginator;
    }

    /**
     * @param Paginator $subject
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        return true;
    }
}
