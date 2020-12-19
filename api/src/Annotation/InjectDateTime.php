<?php


namespace App\Annotation;

/**
 * @Annotation
 * @Target({"METHOD"})
 */
class InjectDateTime
{
    public array $operations;
}
