<?php


namespace App\Service;


use App\Entity\Notification;
use SendGrid\Mail\Mail;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class EmailService
{
    const AFTER_REGISTRATION_EMAIL = 'd-2049ecc337664b2280f25ff3625c330d';
    const USER_WELCOME_EMAIL = 'd-c872ef0b4e764cf194e0ab3621795b40 ';

    private \SendGrid $sendGrid;

    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->sendGrid = new \SendGrid($parameterBag->get('sendgrid'));
    }

    public function sendAfterRegistrationEmail(
        string $email,
        string $password
    ) {
        $mail = new Mail();
        $mail->setTemplateId(self::AFTER_REGISTRATION_EMAIL);
        $mail->addTo($email);
        $mail->setFrom('notification-bot@loopr.cz');
        $mail->addDynamicTemplateDatas([
            'email' => $email,
            'password' => $password
        ]);
        $response = $this->sendGrid->send($mail);
        if ($response->statusCode() > 299) {
            throw new \RuntimeException('Sendgrid reply to: ' . $response->statusCode());
        }
    }

    public function sendAfterWelcomeEmail(Notification $notification)
    {
        $this->sendEmail(
            self::USER_WELCOME_EMAIL,
            $notification->getUser()->getEmail(),
            $notification->getParameters()
        );
    }

    public function sendEmail(
        string $id,
        string $to,
        array $data = []
    ) {
        $mail = new Mail();
        $mail->setTemplateId($id);
        $mail->addTo($to);
        $mail->setFrom('notification-bot@loopr.cz');
        $mail->addDynamicTemplateDatas($data);
        $response = $this->sendGrid->send($mail);
        if ($response->statusCode() > 299) {
            throw new \RuntimeException('Sendgrid reply to: ' . $response->statusCode());
        }
    }
}
