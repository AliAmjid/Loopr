<?php


namespace App\Security\Voter;


use App\Entity\IGroup;
use App\Entity\Subject;
use App\Enum\AclResourceEnum;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class SubjectVoter extends Voter
{
    private Security $security;

    public function __construct(
        Security $security
    ) {
        $this->security = $security;
    }

    const IS_SUBJECT_TEACHER = 'IS_SUBJECT_TEACHER';

    protected function supports(string $attribute, $subject)
    {
        return in_array($attribute, ['ENTITY_ACCESS', self::IS_SUBJECT_TEACHER]) && $subject instanceof Subject;
    }

    /**
     * @param Subject $subject
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $loggedUser = $token->getUser();
        if ($attribute === self::IS_SUBJECT_TEACHER) {
            return $loggedUser->getId() === $subject->getTeacher()->getId();
        }

        if ($this->security->isGranted(AclResourceEnum::SUBJECT_SHOW_ALL)) {
            return true;
        }

        if ($loggedUser->getId() === $subject->getTeacher()->getId()) {
            return true;
        }

        if ($this->security->isGranted('ENTITY_ACCESS', $subject->getIGroup())) {
            return true;
        }

        return false;
    }
}
