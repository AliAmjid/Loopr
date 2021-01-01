<?php


namespace App\Security\Voter;


use App\Entity\Exam;
use App\Entity\MarkSystem;
use App\Entity\PointSystem;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class ExamVoter extends Voter
{
    const CREATE_EXAM = 'CREATE_EXAM';
    const ENTITY_ACCESS = 'ENTITY_ACCESS';


    public function __construct(
        private Security $security
    ) {
    }

    public function supports(string $attribute, $subject)
    {
        return in_array($attribute,
                [self::CREATE_EXAM, self::ENTITY_ACCESS]) && $subject instanceof Exam || $subject instanceof MarkSystem;
    }

    /**
     * @param Exam $subject
     */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        if ($subject instanceof MarkSystem) {
            $subject = $subject->getExam();
        }

        if ($attribute === self::CREATE_EXAM) {
            return $subject->getSubject()->getTeacher()->getId() === $this->security->getUser()->getId();
        }

        if ($attribute === self::ENTITY_ACCESS) {
            if ($this->security->isGranted(self::ENTITY_ACCESS, $subject->getSubject())) {
                return true;
            }
        }
        return false;
    }


}
