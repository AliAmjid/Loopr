<?php


namespace App\Tests;


use App\GraphqlClient\GraphQLClient;
use App\GraphqlClient\GraphQLClientBuilder;
use App\Kernel;
use App\Tests\Helpers\TAssertsHelper;
use App\Tests\Helpers\TCreateEntityHelpers;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;
use Softonic\GraphQL\ClientBuilder;
use Softonic\GraphQL\Response;

abstract class BaseTestCase extends TestCase {

    protected Kernel $kernel;
    /** @var EntityManagerInterface $em */
    protected EntityManagerInterface $em;
    protected Registry $doctrine;

    use TCreateEntityHelpers;
    use TAssertsHelper;

    protected function setUp(): void {
        parent::setUp();
        $this->kernel = new Kernel($_SERVER['APP_ENV'], (bool)$_SERVER['APP_DEBUG']);
        $this->kernel->boot();

        $this->doctrine = $this->kernel->getContainer()->get('doctrine');
        $this->em = $this->doctrine->getManager();
    }

    protected function tearDown(): void {
        $this->deleteAllTestingEntities();

        parent::tearDown();
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
        $password = 'test'
    ): GraphQLClient {
        $response = $this->getClient()->query(
        /** @lang GraphQL */
            'query Token($username : String!, $password : String!) {getToken(username: $username, password: $password ) {token}}', [
            'username' => $username,
            'password' => $password
        ]);
        $this->assertNoErrors($response);
        return $this->getClient($response->getData()['getToken']['token']);
    }


    protected function assertNoErrors(Response $response) {
        $this->assertErrors($response, 0);
    }

    protected function assertErrors(Response $response, $errors) {
        $this->assertEquals($errors, count($response->getErrors()), 'There are un-expected errors ' . json_encode($response->getErrors(), JSON_PRETTY_PRINT));
    }
}
