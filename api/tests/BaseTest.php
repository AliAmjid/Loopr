<?php


namespace App\Tests;


use PHPUnit\Framework\TestCase;
use Softonic\GraphQL\ClientBuilder;
use Softonic\GraphQL\Response;

abstract class BaseTest extends TestCase {

    protected function getClient() {
        return ClientBuilder::build('http://api:80/graphql');
    }

    protected function assertNoErrors(Response $response, $errors = 0) {
        $this->assertEquals($errors, count($response->getErrors()), 'There are un-expected errors');
    }
}
