<?php


namespace App\Security\Voter;


use App\Entity\IGroup;
use App\Entity\Subject;
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

    protected function supports(string $attribute, $subject)
    {
        return $attribute === 'ENTITY_ACCESS' && $subject instanceof Subject;

    }

    /**
     * @param Subject $subject
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $loggedUser = $token->getUser();

        if ($loggedUser->getId() === $subject->getTeacher()->getId()) {
            return true;
        }

        if ($this->security->isGranted('ENTITY_ACCESS', $subject->getIGroup())) {
            return true;
        }

        return false;
    }
}
