<?php


namespace App\Annotation;

#[\Attribute]
class InjectSchoolPeriod
{
    public array $operations;

    public function __construct(array $operations)
    {
        $this->operations = $operations;
    }
}
