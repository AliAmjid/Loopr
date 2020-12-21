<?php


namespace App\Security\Voter;


use App\Entity\User;
use App\Enum\AclResourceEnum;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class UserVoter extends Voter
{
    private Security $security;

    public function __construct(
        Security $security
    ) {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject)
    {
        return $attribute === 'ENTITY_ACCESS' && $subject instanceof User;
    }

    /**
     * @param User $subject
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        /** @var User $loggedUser */
        $loggedUser = $token->getUser();

        if ($subject->getId() === $loggedUser->getId()) {
            return true;
        }

        if ($this->security->isGranted(AclResourceEnum::USER_SHOW_ALL)) {
            return true;
        }


        if ($this->security->isGranted(IsUserTeacherVoter::IS_USERS_TEACHER, $subject)) {
            return true;
        }

        return false;
    }
}
