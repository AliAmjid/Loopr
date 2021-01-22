<?php


namespace App\Error;


use GraphQL\Error\ClientAware;
use GraphQL\Error\Error;
use Throwable;

class ClientError extends \RuntimeException implements ClientAware
{
    protected string $codeMsg;
    protected ?array $payload = null;

    public function __construct(array $clientErrorType, ?array $payload = null)
    {
        parent::__construct($clientErrorType['msg']);
        $this->codeMsg = $clientErrorType['code'];
        $this->payload = $payload;
    }

    /**
     * @return string
     */
    public function getCodeMsg(): string
    {
        return $this->codeMsg;
    }

    public function getPayload(): ?array
    {
        return $this->payload;
    }

    public function isClientSafe()
    {
        return true;
    }

    public function getCategory()
    {
        return $this->getCodeMsg();
    }
}
