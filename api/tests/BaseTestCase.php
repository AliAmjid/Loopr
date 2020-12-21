<?php


namespace App\Tests;


use ApiPlatform\Core\Api\IriConverterInterface;
use App\Entity\User;
use App\GraphqlClient\GraphQLClient;
use App\GraphqlClient\GraphQLClientBuilder;
use App\Kernel;
use App\Tests\Helpers\TAssertsHelper;
use App\Tests\Helpers\TCreateEntityHelpers;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use PHPUnit\Framework\TestCase;
use Softonic\GraphQL\ClientBuilder;
use Softonic\GraphQL\Response;

abstract class BaseTestCase extends TestCase
{

    protected Kernel $kernel;
    /** @var ObjectManager $em */
    protected \Doctrine\Persistence\ObjectManager $em;
    protected Registry $doctrine;
    use TCreateEntityHelpers;
    use TAssertsHelper;

    protected function setUp(): void
    {
        parent::setUp();
        $this->kernel = new Kernel($_SERVER['APP_ENV'], (bool)$_SERVER['APP_DEBUG']);
        $this->kernel->boot();

        $this->doctrine = $this->kernel->getContainer()->get('doctrine');
        $this->em = $this->doctrine->getManager();
    }

    protected function tearDown(): void
    {
        $this->deleteAllTestingEntities();

        parent::tearDown();
    }

    protected function clientFactory($token = null)
    {
        return GraphQLClientBuilder::build('http://api:80/graphql', $token ? [
            'headers' => [
                'Authorization' => 'Bearer ' . $token
            ]
        ] : []);
    }

    protected function client(
        $email,
        $password = 'test'
    ): GraphQLClient {
        $response = $this->clientFactory()->query(
        /** @lang GraphQL */
            'query Token($email : String!, $password : String!) {getToken(email: $email, password: $password ) {token}}',
            [
                'email' => $email,
                'password' => $password
            ]);
        $this->assertNoErrors($response);
        return $this->clientFactory($response->getData()['getToken']['token']);
    }


    protected function assertNoErrors(Response $response)
    {
        $this->assertErrors($response, 0);
    }

    protected function assertErrors(Response $response, $errors)
    {
        $this->assertEquals($errors, count($response->getErrors()),
            'There are un-expected errors ' . json_encode($response->getErrors(), JSON_PRETTY_PRINT));
    }

    protected function assertError(Response $response, string $errorCode)
    {
        $errorFounded = false;
        $errors = $response->getErrors();
        foreach ($errors as $error) {
            $loopr = $error['loopr-error'] ?? null;
            if (!$loopr) {
                throw new \RuntimeException("Loopr secction is missing!");
            }
            if ($loopr['code'] == $errorCode) {
                $errorFounded = true;
            }
        }
        $this->assertTrue($errorFounded);
    }

    public function queryLibrary(GraphQLClient $client): QueryLibrary
    {
        return new QueryLibrary($client);
    }
}
