<?php

namespace App\Tests\Controller;

use App\Entity\User;
use App\Tests\BaseTestCase;
use PHPUnit\Util\Exception;


class LoginControllerTestCase extends BaseTestCase {

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
            'query {meUser{_id}}'
        );
        $this->assertNoErrors($response);
        $this->assertEquals($user->getId(), $response->getData()['meUser']['_id']);
    }
}
