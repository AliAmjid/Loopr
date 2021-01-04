<?php


namespace App\Entity;


use App\Error\ClientError;
use App\Error\ClientErrorType;
use Doctrine\ORM\Mapping as ORM;

abstract class MarkSystem
{

    abstract function getMarkSystemType(): string;

    abstract function getId(): ?string;

    abstract function getExam(): Exam;

    /**
     * @ORM\PrePersist()
     */
    public function assert()
    {
        if ($this->getExam()->getSubject()->getEvaluationSystem() !== $this->getMarkSystemType()) {
            throw new ClientError(
                ClientErrorType::BAD_MARK_SYSTEM,
                ['got' => $this->getMarkSystemType(), 'expected' => $this->getExam()->getSubject()->getEvaluationSystem()]
            );
        }
    }
}
