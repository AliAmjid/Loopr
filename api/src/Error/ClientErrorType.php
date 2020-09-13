<?php


namespace App\Error;


class ClientErrorType {
    const INVALID_ROLE_CONFIG = [
        'code' => 'INVALID_ROLE_CONFIG',
        'msg' => 'Role configuration is incompatible or wrong.'
    ];

    const ACCESS_DENIED = [
        'code' => 'ACCESS_DENIED',
        'msg' => 'Access was denied.'
    ];

    const VALIDATION_ERROR = [
        'code' => 'VALIDATION_ERROR',
        'msg' => 'You have sent invalid data. See details'
    ];
}
