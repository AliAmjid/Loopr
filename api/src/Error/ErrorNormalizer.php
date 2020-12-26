<?php


namespace App\Error;


use ApiPlatform\Core\Bridge\Symfony\Validator\Exception\ValidationException;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use GraphQL\Error\ClientAware;
use GraphQL\Error\InvariantViolation;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Serializer\Exception\UnexpectedValueException;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use GraphQL\Error\FormattedError;
use Symfony\Component\Validator\ConstraintViolation;

class ErrorNormalizer implements NormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    protected $translators = [];

    public function __construct()
    {
        $this->translators = [
            AccessDeniedHttpException::class => function (AccessDeniedHttpException $e, &$error) {
                $this->pushExceptionWithTranslateToLooprError(ClientErrorType::ACCESS_DENIED, $e, $error);
                $msg = $e->getMessage();
                if (str_contains($msg, 'r: ')) {
                    $msg = str_replace('r: ', '', $msg);
                    $error['loopr-error']['payload']['requiredResources'] = explode(',', $msg);
                }
            },

            ValidationException::class => function (ValidationException $e, &$error) {
                $this->pushExceptionWithTranslateToLooprError(ClientErrorType::VALIDATION_ERROR, $e, $error);
                $violations = [];
                /** @var ConstraintViolation $item */
                foreach ($e->getConstraintViolationList() as $item) {
                    $violations[] = [
                        'message' => $item->getMessage(),
                        'propertyName' => $item->getPropertyPath(),
                        'invalidValue' => $item->getInvalidValue(),
                        'constraint' => $item->getConstraint() ? (array)$item->getConstraint() : null
                    ];
                }
                $error['loopr-error']['payload']['violations'] = $violations;
            },
            UnexpectedValueException::class => ClientErrorType::UNEXPECTED_VALUE,
            UniqueConstraintViolationException::class => ClientErrorType::DUPLICATE_VALUE,
            InvariantViolation::class => ClientErrorType::CHECK_ACCESS
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function normalize($object, string $format = null, array $context = []): array
    {
        $exception = $object->getPrevious();
        $error = FormattedError::createFromException($object);
        if ($exception instanceof ClientError) {
            $error['loopr-error'] = [
                'msg' => $exception->getMessage(),
                'code' => $exception->getCodeMsg(),
                'payload' => $exception->getPayload()
            ];
        }

        foreach ($this->translators as $exceptionClass => $translator) {
            if ($exception instanceof $exceptionClass) {
                if (is_callable($translator)) {
                    $translator($exception, $error);
                } else {
                    if (is_array($translator)) {
                        $this->pushExceptionWithTranslateToLooprError($translator, $exception, $error);
                    } else {
                        throw new \RuntimeException("$exceptionClass has bad translator");
                    }
                }
            }
        }


        if (!isset($error['loopr-error'])) {
            if ($exception instanceof \Throwable) {
                throw $exception;
            }
        }

        return $error;
    }

    /**
     * {@inheritdoc}
     */
    public function supportsNormalization($data, string $format = null): bool
    {
        return $data instanceof \Throwable;
    }

    protected function pushExceptionWithTranslateToLooprError(array $translator, \Throwable $exception, &$error)
    {
        $error['loopr-error'] = [
            'msg' => $translator['msg'],
            'code' => $translator['code'],
            'payload' => [
                'message' => $exception->getMessage(),
                'type' => get_class($exception)
            ]
        ];
    }
}
