<?php


namespace App\Security\Voter;


use App\Entity\Point;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class PointVoter extends Voter
{
    public function __construct(
        private Security $security
    ) {
    }

    protected function supports(string $attribute, $subject)
    {
        return in_array($attribute, ['ENTITY_ACCESS']) && $subject instanceof Point;
    }

    /**
     * @var Point $subject
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        /** @var User $user */
        $user = $this->security->getUser();
        if ($attribute === 'ENTITY_ACCESS') {
            if ($subject->getUser()->getId() === $user->getId()) {
                return true;
            }

            if ($this->security->isGranted(ExamVoter::CREATE_EXAM, $subject->getPointSystem()->getExam())) {
                return true;
            }
        }
        return false;
    }

}
