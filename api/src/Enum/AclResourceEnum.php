<?php


namespace App\Enum;


class AclResourceEnum
{

    //To have same uuid everytime
    const PROP_UUIDS = [
        self::USER_LOGGED => '173a348e-12f6-4da4-ab8e-b984cee25eaa',
        self::ROLE_CREATE => 'cbfd4f00-35fb-4a6e-8c96-35ad7b9aefbe',
        self::ROLE_EDIT => '8a146009-deca-4625-b590-e44c2283c8d3',
        self::USER_SHOW_ALL => '717f72f6-6b6c-4033-aba3-130976fa3620',
        self::USER_CREATE => 'c6e8f8e8-8f8a-4ead-a97d-8af1240c388b',
        self::USER_EDIT => 'c1f52e13-1864-42d1-a095-dcc42eefb7a3',
        self::USER_SHOW => '857281f0-c31c-4196-a130-62005bdbc496',
        self::GROUP_SHOW_ALL => 'a4f06f15-48d1-4fee-9408-3c7b891226a9',
        self::GROUP_TEACHER => 'f309dc64-f545-4903-8fa4-362a6453c598',
        self::GROUP_CREATE => '003d3f22-ba8b-4903-ab48-70c1501c3909'
    ];

    const PROP_DEPENDENT_ON = [
        self::USER_LOGGED => [],
        self::ROLE_CREATE => [
            self::USER_LOGGED
        ],
        self::ROLE_EDIT => [
            self::USER_LOGGED
        ],
        self::USER_SHOW_ALL => [
            self::USER_LOGGED
        ]
    ];


    const PROP_DEFAULT_ROLES = [
        'ROLE_USER' => [
            self::USER_LOGGED,
        ],

        'ROLE_ADMIN' => [
            self::USER_LOGGED,
            self::ROLE_CREATE,
            self::ROLE_EDIT,
            self::USER_SHOW_ALL,
            self::USER_CREATE,
            self::USER_EDIT,
            self::USER_SHOW,
            self::GROUP_TEACHER,
            self::GROUP_SHOW_ALL,
            self::GROUP_CREATE
        ]
    ];

    //Resources
    const USER_LOGGED = 'USER_LOGGED';
    const ROLE_CREATE = 'ROLE_CREATE';
    const ROLE_EDIT = 'ROLE_EDIT';

    //User
    const USER_SHOW_ALL = 'USER_SHOW_ALL';
    const USER_CREATE = 'USER_CREATE';
    const USER_EDIT = 'USER_EDIT';
    const USER_SHOW = 'USER_SHOW';

    //group
    const GROUP_TEACHER = 'GROUP_TEACHER'; // can be group class teacher
    const GROUP_SHOW_ALL = 'GROUP_SHOW_ALL';
    const GROUP_CREATE = 'GROUP_CREATE';
}
