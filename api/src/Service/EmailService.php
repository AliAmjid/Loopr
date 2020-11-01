<?php


namespace App\Service;


use App\Entity\User;
use SendGrid\Mail\Mail;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class EmailService {
    const AFTER_REGISTRATION_EMAIL = 'd-2049ecc337664b2280f25ff3625c330d';

    private \SendGrid $sendGrid;

    public function __construct(ParameterBagInterface $parameterBag) {
        $this->sendGrid = new \SendGrid($parameterBag->get('sendgrid'));
    }

    public function sendAfterRegistrationEmail(
        User $user,
        string $password
    ) {
        $mail = new Mail();
        $mail->setTemplateId(self::AFTER_REGISTRATION_EMAIL);
        $mail->addDynamicTemplateDatas([
            'email' => $user->getEmail(),
            'password' => $password
        ]);

        $this->sendGrid->send($mail);
    }
}
