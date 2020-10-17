<?php

namespace App\Tests\Features;

use App\Entity\User;
use App\Enum\AclResourceEnum;
use App\Tests\BaseTestCase;
use Nette\Utils\Random;
use PHPUnit\Util\Exception;
use Softonic\GraphQL\Response;


class AclTest extends BaseTestCase {

    public function testGetTokenAndLogin() {
        $user = $this->createRandomUser();
        $client = $this->getClient();
        $response = $client->query(
        /** @lang GraphQL */
            'query Token($email : String!, $password : String!) {getToken(email: $email, password: $password ) {token}}', [
            'email' => $user->getEmail(),
            'password' => 'test'
        ]);

        $this->assertNoErrors($response);
        $loggedClient = $this->getClient($response->getData()['getToken']['token']);
        $response = $loggedClient->query(
        /** @lang GraphQL */
            'query {meUser{_id,id,email,name,role{resources{name,dependsOn{name}}}}}'
        );
        $this->assertNoErrors($response);
        $this->assertEquals($user->getId(), $response->getData()['meUser']['_id']);
    }

    public function testCreateRole() {
        $this->assertSecurityResources(
            [AclResourceEnum::CREATE_ROLE],
            function (User $user): Response {
                $client = $this->createLoggedClient($user->getEmail(), 'test');
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

    public function testCreateRoleWithInvalidName() {
        $user = $this->createRandomUser('test', [AclResourceEnum::CREATE_ROLE]);

        $client = $this->createLoggedClient($user->getEmail());
        $query = /** @lang GraphQL */
            '
        mutation role($name: String!, $idResources: [String]) {
        createAclRole(input: {
        name: $name,
        resources: $idResources
        }
      ) {aclRole{name,resources{name}}}
}
';

        $response = $client->query($query, ['name' => 'InvalidName', 'idResources' => [
            'acl_resources/' . AclResourceEnum::PROP_UUIDS[AclResourceEnum::USER_LOGGED]
        ]]);
        print_r($response->getErrors());
        $this->assertErrors($response, 1);
    }

    public function testUpdateAclRole() {
        $this->assertSecurityResources([AclResourceEnum::EDIT_ROLE], function (User $user, bool $noError) {
            $role = $this->createRoleWithResources([]);
            $client = $this->createLoggedClient($user->getEmail());
            $query = /** @lang GraphQL */
                '
        mutation role($name: String!, $idResources: [String], $id: ID!) {
        updateAclRole(input: {
        id: $id
        name: $name,
        resources: $idResources
        }
      ) {aclRole{name,resources{name}}}
}';
            $response = $client->query($query, [
                'name' => 'ROLE_TESTING',
                'idResources' => [
                    'acl_resources/' . AclResourceEnum::PROP_UUIDS[AclResourceEnum::USER_LOGGED]
                ],
                'id' => 'acl_roles/' . $role->getId()
            ]);

            if ($noError) {
                $this->em->refresh($role);
                $this->assertNoErrors($response);
                $this->assertSame('ROLE_TESTING', $role->getName());
                $this->assertTrue($role->hasResource(AclResourceEnum::USER_LOGGED));
            }

            return $response;
        });
    }
}
