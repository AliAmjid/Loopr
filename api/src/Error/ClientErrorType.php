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

    const EMPTY_GROUP_CLASS_GROUP = [
        'code' => 'EMPTY_GROUP_CLASS_GROUP',
        'msg' => 'Group or ClassGroup is empty.'
    ];

    const USER_CAN_NOT_BE_TAUGHT = [
        'code' => 'USER_CAN_NOT_BE_TAUGHT',
        'msg' => 'User need resource USER_CAN_STUDY'
    ];

    const INVALID_IRI = [
        'code' => 'INVALID_IRI',
        'msg' => 'Invalid IRI'
    ];

    const CHECK_ACCESS = [
        'code' => 'CHECK_ACCESS',
        'msg' => 'You probably dont have to access to some of field you are trying to access. '
    ];

    const SCHOOL_PERIOD_VALIDATION_ERROR = [
        'code' => 'SCHOOL_PERIOD_VALIDATION_ERROR',
        'msg' => 'Some of configuration for school period is wrong.'
    ];

    const NO_SCHOOL_PERIOD_ACTIVE = [
        'code' => 'NO_SCHOOL_PERIOD_ACTIVE',
        'msg' => 'No school period is active right now.. contact administrator'
    ];

    const BAD_MARK_SYSTEM = [
        'code' => 'BAD_MARK_SYSTEM',
        'msg' => 'Cant create mark system with this exam. Exam has different exam system'
    ];

    const USER_NOT_EXAM_MEMBER = [
        'code' => 'USER_NOT_EXAM_MEMBER',
        'msg' => 'User is not member of group of subject on which is exam created'
    ];

    const CANNOT_BE_DE_ARCHIVED = [
      'code' => 'CANNOT_BE_DE_ARCHIVED',
      'msg' => 'Cant be de-archived'
    ];

    const CANT_BE_ARCHIVED = [
        'code' => 'CANT_BE_ARCHIVED',
        'msg' => 'Cant be archived'
    ];

    const ALREADY_ARCHIVED = [
      'code' => 'ALREADY_ARCHIVED',
      'msg' => 'Already archived'
    ];
    const ALREADY_ACTIVE = [
        'code' => 'ALREADY_ACTIVE',
        'msg' => 'Already archived'
    ];

}
