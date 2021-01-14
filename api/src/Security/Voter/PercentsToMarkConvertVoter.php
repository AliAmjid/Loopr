<?php


namespace App\Security\Voter;


use App\Entity\PercentToMarkConvert;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class PercentsToMarkConvertVoter extends Voter
{
    const UPDATE_PERCENT_TO_MARK_CONVERT = 'UPDATE_PERCENT_TO_MARK_CONVERT';

    public function __construct(
        private Security $security
    ) {
    }

    protected function supports(string $attribute, $subject)
    {
        return $subject instanceof PercentToMarkConvert &&
            in_array($attribute, ['ENTITY_ACCESS', 'UPDATE_PERCENT_TO_MARK_CONVERT']);
    }

    /**
     * @var PercentToMarkConvert $subject
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        if ($attribute === 'ENTITY_ACCESS') {
            return true;
        }

        if ($attribute === self::UPDATE_PERCENT_TO_MARK_CONVERT) {
            if ($subject->getSubject()) {
                return $this->security->getUser()->getId() === $subject->getSubject()->getTeacher()->getId();
            }

            if ($subject->getUser()) {
                return $subject->getUser()->getUser()->getId() === $this->security->getUser()->getId();
            }

        }
        return false;
    }
}
