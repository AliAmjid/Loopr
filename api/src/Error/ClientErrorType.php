<?php


namespace App\Error;


class ClientErrorType
{
    const INVALID_ROLE_CONFIG = [
        'code' => 'INVALID_ROLE_CONFIG',
        'msg' => 'Role configuration is incompatible or wrong.'
    ];

    const USER_NOT_FOUND = [
        'code' => 'USER_NOT_FOUND',
        'msg' => 'User with this credentials not found'
    ];

    const ACCESS_DENIED = [
        'code' => 'ACCESS_DENIED',
        'msg' => 'Access was denied.'
    ];

    const VALIDATION_ERROR = [
        'code' => 'VALIDATION_ERROR',
        'msg' => 'You have sent invalid data. See details'
    ];

    const UNEXPECTED_VALUE = [
        'code' => 'UNEXPECTED_VALUE',
        'msg' => 'check if IRI value is correct (id need to be in format <resource>/<uuid>)'
    ];

    const DUPLICATE_VALUE = [
        'code' => 'DUPLICATE_VALUE',
        'msg' => 'attempt of creating duplicated value.'
    ];

    const OLD_PASSWORD_IS_WRONG = [
        'code' => 'OLD_PASSWORD_IS_WRONG',
        'msg' => 'Old password is wrong'
    ];

    const USER_IS_NOT_TEACHER = [
        'code' => 'USER_IS_NOT_TEACHER',
        'msg' => 'User does not have GROUP_TEACHER resources.'
    ];
}
