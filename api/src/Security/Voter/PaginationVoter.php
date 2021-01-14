<?php


namespace App\Security\Voter;


use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class PaginationVoter extends Voter
{
    protected function supports(string $attribute, $subject)
    {
        return $subject instanceof Paginator && $attribute === 'ENTITY_ACCESS';
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        return true;
    }

}
