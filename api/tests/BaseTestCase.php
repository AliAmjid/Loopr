<?php


namespace App\Tests;


use App\GraphqlClient\GraphQLClientBuilder;
use App\Kernel;
use App\Tests\Helpers\TCreateEntityHelpers;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;
use Softonic\GraphQL\ClientBuilder;
use Softonic\GraphQL\Response;

abstract class BaseTestCase extends TestCase {

    protected Kernel $kernel;
    protected EntityManagerInterface $em;
    protected Registry $doctrine;
    use TCreateEntityHelpers;


    protected function setUp(): void {
        parent::setUp();
        $this->kernel = new Kernel($_SERVER['APP_ENV'], (bool)$_SERVER['APP_DEBUG']);
        $this->kernel->boot();

        $this->doctrine = $this->kernel->getContainer()->get('doctrine');
        $this->em = $this->doctrine->getManager();
    }

    protected function getClient($token = null) {
        return GraphQLClientBuilder::build('http://api:80/graphql', $token ? [
            'headers' => [
                'Authorization' => 'Bearer ' . $token
            ]
        ] : []);
    }

    protected function createLoggedClient(
        $username,
        $password
    ) {
        $response = $this->getClient()->query(
        /** @lang GraphQL */
            'query Token($username : String!, $password : String!) {getToken(username: $username, password: $password ) {token}}', [
            'username' => $username,
            'password' => $password
        ]);
        $this->assertNoErrors($response);
        return $this->getClient($response['getToken']['token']);
    }

    protected function assertNoErrors(Response $response, $errors = 0) {
        $this->assertEquals($errors, count($response->getErrors()), 'There are un-expected errors');
    }
}
