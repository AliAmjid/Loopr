<?php


namespace App\Security\Voter;


use App\Entity\ClassGroup;
use App\Entity\Group;
use App\Entity\IGroup;
use App\Entity\User;
use App\Enum\AclResourceEnum;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class GroupVoter extends Voter
{

    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject)
    {
        return $attribute === 'ENTITY_ACCESS' && $subject instanceof IGroup;
    }

    /**
     * @param IGroup $subject
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        return true;
        /** @var User $loggedUser */
        $loggedUser = $token->getUser();
        if ($this->security->isGranted(AclResourceEnum::GROUP_SHOW_ALL)) {
            return true;
        }

        if ($subject instanceof ClassGroup) {
            if ($subject->getTeacher() && $subject->getTeacher()->getId() === $loggedUser->getId()) {
                return true;
            }
        }

        foreach ($subject->getUsers() as $user) {
            if ($user->getId() === $loggedUser->getId()) {
                return true;
            }
        }

        foreach ($subject->getSubjects() as $subjectRelation) {
            if ($subjectRelation->getTeacher()->getId() === $loggedUser->getId()) {
                return true;
            }
        }

        return false;
    }

}
