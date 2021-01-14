<?php


namespace App\Enum;


class NotificationType
{
    /**
     * payloads: name: string
     */
    const USER_WELCOME = 'USER_WELCOME';

    /**
     *  payloads: old: int, now: int, max: int, exam: id, examName
     */
    const POINT_CHANGED = 'POINT_CHANGED';

    /**
     *  payloads: exam: id, max: int, now, int, examName
     */
    const NEW_POINT = 'NEW_POINT';
}
