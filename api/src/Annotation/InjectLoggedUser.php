<?php


namespace App\Annotation;


use Doctrine\Common\Annotations\Annotation\Target;

/**
 * @Annotation
 * @Target({"METHOD"})
 */
final class InjectLoggedUser
{
    public array $operations;
}
