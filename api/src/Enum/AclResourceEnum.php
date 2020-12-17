<?php


namespace App\Enum;


class AclResourceEnum
{

    //To have same uuid everytime
    const PROP_UUIDS = [
        self::USER_LOGGED => '173a348e-12f6-4da4-ab8e-b984cee25eaa',
        self::ACL_ROLE_EDIT => '8a146009-deca-4625-b590-e44c2283c8d3',
        self::USER_SHOW_ALL => '717f72f6-6b6c-4033-aba3-130976fa3620',
        self::USER_EDIT => 'c1f52e13-1864-42d1-a095-dcc42eefb7a3',
        self::GROUP_SHOW_ALL => 'a4f06f15-48d1-4fee-9408-3c7b891226a9',
        self::GROUP_TEACHER => 'f309dc64-f545-4903-8fa4-362a6453c598',
        self::GROUP_EDIT => '003d3f22-ba8b-4903-ab48-70c1501c3909',
        self::SUBJECT_SHOW_ALL => '37ba964e-2532-45f8-a84a-aa4d1392bfe5',
        self::SUBJECT_EDIT => 'ea61f178-10bc-4a1e-89a9-bcc51b7ba8a0',
        self::SUBJECT_DELETE => 'bc022b3a-bf64-4b59-abb1-0afbe6894902',
        self::SUBJECT_TYPE_SHOW_ALL => '7c54d687-0202-4612-87f6-bdf4f3ef8636',
        self::SUBJECT_TYPE_DELETE => 'd3726a26-06a3-4610-9bc7-b0cf6b4c41dd',
        self::SUBJECT_TYPE_EDIT => '07ddfa12-82da-46c6-afbf-cf8043ebed55',
        self::GROUP_DELETE => 'fd6cc009-f1c3-43c5-a1ae-33ad12f2b907',
        self::SUBJECT_TEACHER => '961fca80-a758-4dff-873a-09d428323943',
        self::GROUP_CAN_BE_TAUGHT => 'd31f7b05-192e-4d5b-a40c-5036cdf30224'
    ];

    const PROP_DEPENDENT_ON = [
        self::USER_LOGGED => [],
        self::ACL_ROLE_EDIT => [
            self::USER_LOGGED
        ],
        self::USER_SHOW_ALL => [
            self::USER_LOGGED
        ],
        self::SUBJECT_EDIT => [
            self::GROUP_SHOW_ALL,
            self::SUBJECT_TYPE_SHOW_ALL
        ],
        self::GROUP_EDIT => [
            self::USER_SHOW_ALL
        ],

        self::GROUP_DELETE => [
            self::GROUP_SHOW_ALL
        ],

        self::SUBJECT_TYPE_DELETE => [
            self::SUBJECT_TYPE_SHOW_ALL
        ],

        self::USER_EDIT => [
            self::USER_SHOW_ALL
        ]
    ];


    const PROP_DEFAULT_ROLES = [
        'ROLE_USER' => [
            self::USER_LOGGED,
        ],

        'ROLE_ADMIN' => [
            self::USER_LOGGED,
            self::ACL_ROLE_EDIT,
            self::USER_SHOW_ALL,
            self::USER_EDIT,
            self::GROUP_TEACHER,
            self::GROUP_SHOW_ALL,
            self::GROUP_EDIT,
            self::SUBJECT_SHOW_ALL,
            self::SUBJECT_EDIT,
            self::SUBJECT_DELETE,
            self::SUBJECT_TYPE_SHOW_ALL,
            self::SUBJECT_TYPE_EDIT,
            self::SUBJECT_TYPE_DELETE,
            self::SUBJECT_TEACHER
        ]
    ];

    //Resources
    const USER_LOGGED = 'USER_LOGGED';
    const ACL_ROLE_EDIT = 'ACL_ROLE_EDIT';

    //User
    const USER_SHOW_ALL = 'USER_SHOW_ALL';
    const USER_EDIT = 'USER_EDIT';
    const USER_DELETE = 'USER_DELETE';

    //group
    const GROUP_TEACHER = 'GROUP_TEACHER'; // can be group class teacher
    const GROUP_SHOW_ALL = 'GROUP_SHOW_ALL';
    const GROUP_EDIT = 'GROUP_EDIT';
    const GROUP_DELETE = 'GROUP_DELETE';
    const GROUP_CAN_BE_TAUGHT = 'GROUP_CAN_BE_TAUGHT';

    //subject
    const SUBJECT_SHOW_ALL = 'SUBJECT_SHOW_ALL';
    const SUBJECT_EDIT = 'SUBJECT_EDIT';
    const SUBJECT_DELETE = 'SUBJECT_DELETE';
    const SUBJECT_TEACHER = 'SUBJECT_TEACHER'; // can be subject teacher

    //subject type
    const SUBJECT_TYPE_SHOW_ALL = 'SUBJECT_TYPE_SHOW_ALL';
    const SUBJECT_TYPE_EDIT = 'SUBJECT_TYPE_EDIT';
    const SUBJECT_TYPE_DELETE = 'SUBJECT_TYPE_DELETE';

}
