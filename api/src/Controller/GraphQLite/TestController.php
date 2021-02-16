<?php


namespace App\Controller\GraphQLite;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use TheCodingMachine\GraphQLite\Annotations\Query;

class TestController extends AbstractController
{
    #[Query]
    public function ping(): bool
    {
        return true;
    }
}
