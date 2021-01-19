<?php


namespace App\Annotation;

#[\Attribute]
class InjectSchoolPeriod
{
    public array $operations;
    public ?string $dateProperty = null;
    public function __construct(array $operations, ?string $dateProperty = null)
    {
        $this->operations = $operations;
        $this->dateProperty = $dateProperty;
    }
}
