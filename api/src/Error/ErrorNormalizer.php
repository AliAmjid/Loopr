<?php


namespace App\Error;


use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use GraphQL\Error\Error;
use GraphQL\Error\FormattedError;

class ErrorNormalizer implements NormalizerInterface {

    const TRANSLATES = [
        AccessDeniedHttpException::class => ClientErrorType::ACCESS_DENIED
    ];

    /**
     * {@inheritdoc}
     */
    public function normalize($object, string $format = null, array $context = []): array {
        $exception = $object->getPrevious();
        $error = FormattedError::createFromException($object);
        if ($exception instanceof ClientError) {
            $error['loopr-error'] = [
                'msg' => $exception->getMessage(),
                'code' => $exception->getCodeMsg(),
                'payload' => $exception->getPayload()
            ];
        }

        foreach (self::TRANSLATES as $exceptionClass => $code) {
            if ($exception instanceof $exceptionClass) {
                $error['loopr-error'] = [
                    'msg' => $code['msg'],
                    'code' => $code['code'],
                    'payload' => [
                        'message' => $exception->getMessage(),
                        'type' => get_class($exception)
                    ]
                ];
                if ($exception instanceof AccessDeniedHttpException) {
                    $msg = $exception->getMessage();
                    if (str_contains($msg, 'r: ')) {
                        $msg = str_replace('r: ', '', $msg);
                        $error['loopr-error']['payload']['requiredResources'] = explode(',', $msg);
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
    public function supportsNormalization($data, string $format = null): bool {
        return $data instanceof Error;
    }

}
