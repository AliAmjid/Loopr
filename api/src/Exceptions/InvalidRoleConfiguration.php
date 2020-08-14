<?php


namespace App\Exceptions;


use Throwable;

class InvalidRoleConfiguration extends \Exception {
    public function __construct($message = "INVALID_ROLE_CONFIGURATION", $code = 0, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}
