<?php


namespace App\Security\Voter;


use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class IsUserTeacherVoter extends Voter
{
    const IS_USERS_TEACHER = 'IS_USERS_TEACHER';

    protected function supports(string $attribute, $subject)
    {
        return $attribute === self::IS_USERS_TEACHER && $subject instanceof User;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $loggedUser = $token->getUser();
        if ($subject->getClassGroup()
            && $subject->getClassGroup()->getTeacher()
            && $subject->getClassGroup()->getTeacher()->getId() === $loggedUser->getId()) {
            return true;
        }
        return false;
    }
}
