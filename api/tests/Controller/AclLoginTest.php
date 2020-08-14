<?php

namespace App\Tests\Controller;

use App\Entity\User;
use App\Enum\AclResourceEnum;
use App\Tests\BaseTestCase;
use Nette\Utils\Random;
use PHPUnit\Util\Exception;
use Softonic\GraphQL\Response;


class AclLoginTest extends BaseTestCase {

    public function testGetTokenAndLogin() {
        $user = $this->createRandomUser();
        $client = $this->getClient();
        $response = $client->query(
        /** @lang GraphQL */
            'query Token($username : String!, $password : String!) {getToken(username: $username, password: $password ) {token}}', [
            'username' => $user->getUsername(),
            'password' => 'test'
        ]);

        $this->assertNoErrors($response);
        $loggedClient = $this->getClient($response->getData()['getToken']['token']);
        $response = $loggedClient->query(
        /** @lang GraphQL */
            'query {meUser{_id,id,username,name,role{resources{name,dependsOn{name}}}}}'
        );
        $this->assertNoErrors($response);
        $this->assertEquals($user->getId(), $response->getData()['meUser']['_id']);
    }

    public function testCreateRole() {
        $this->assertSecurityResources(
            [AclResourceEnum::CREATE_ROLE],
            function (User $user): Response {
                $client = $this->createLoggedClient($user->getUsername(), 'test');
                $response = $client->query(/** @lang GraphQL */ 'mutation role($name: String!, $idResources: [String]) {
        createAclRole(input: {
        name: $name,
        resources: $idResources
        }
      ) {aclRole{name,resources{name}}}
}', ['name' => $this->randomRoleName(), 'idResources' => [
                    'acl_resources/' . AclResourceEnum::PROP_UUIDS[AclResourceEnum::USER_LOGGED]
                ]]);

                return $response;
            }
        );
    }
}
