<?php


namespace App\Security\Voter;


use App\Entity\User;
use App\Enum\AclResourceEnum;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{
    private Security $security;

    public function __construct(
        Security $security
    ) {
        $this->security = $security;
    }

    const IS_USERS_TEACHER = 'IS_USERS_TEACHER';
    const IS_SAME_USER = 'IS_SAME_USER';


    protected function supports(string $attribute, $subject)
    {
        return in_array($attribute,
                ['ENTITY_ACCESS', self::IS_USERS_TEACHER, self::IS_SAME_USER]) && $subject instanceof User;
    }

    /**
     * @param User $subject
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        /** @var User $loggedUser */
        $loggedUser = $token->getUser();

        if ($attribute === self::IS_USERS_TEACHER) {
            return $this->isUsersTeacher($loggedUser, $subject);
        }

        if ($attribute === self::IS_SAME_USER) {
            return $subject->getId() === $loggedUser->getId();
        }

        if ($subject->getId() === $loggedUser->getId()) {
            return true;
        }

        if ($this->security->isGranted(AclResourceEnum::USER_SHOW_ALL)) {
            return true;
        }


        if ($this->isUsersTeacher($subject, $loggedUser)) { //user is teacher of loggedUSer
            return true;
        }

        if ($this->isUsersTeacher($loggedUser, $subject)) { //loggedUser is teacher of user
            return true;
        }

        return false;
    }


    private function isUsersTeacher(UserInterface $loggedUser, User $subject)
    {
        if ($subject->getClassGroup()
            && $subject->getClassGroup()->getTeacher()
            && $subject->getClassGroup()->getTeacher()->getId() === $loggedUser->getId()) {
            return true;
        }

        return false;
    }
}
