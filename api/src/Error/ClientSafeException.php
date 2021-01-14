<?php


namespace App\Error;


use GraphQL\Error\ClientAware;
use Throwable;

class ClientSafeException extends \Exception implements ClientAware
{

    private string $category;

    public function __construct($message = "", string $category = 'OTHER', Throwable $previous = null)
    {
        parent::__construct($message, 0, $previous);
    }


    public function isClientSafe()
    {
        return true;
    }

    public function getCategory()
    {
        return $this->category;
    }


    public static function fromException(\Throwable $e, string $category = 'OTHER')
    {
        return new self($e->getMessage(), $category, $e);
    }

}
