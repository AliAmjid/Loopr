<?php


namespace App\Enum;


class AclResourceEnum {

    //To have same uuid everytime
    const PROP_UUIDS = [
        self::USER_LOGGED => '173a348e-12f6-4da4-ab8e-b984cee25eaa',
        self::CREATE_ROLE => 'cbfd4f00-35fb-4a6e-8c96-35ad7b9aefbe'
    ];

    const PROP_DEPENDENT_ON = [
        self::USER_LOGGED => [],
        self::CREATE_ROLE => [
            self::USER_LOGGED
        ]
    ];



    const PROP_DEFAULT_ROLES = [
        'ROLE_USER' => [
            self::USER_LOGGED,
        ],

        'ROLE_ADMIN' => [
            self::USER_LOGGED,
            self::CREATE_ROLE
        ]
    ];

    //Resources
    const USER_LOGGED = 'USER_LOGGED';
    const LIST_ALL_USERS = 'LIST_ALL_USERS';
    const CREATE_ROLE = 'CREATE_ROLE';

}
