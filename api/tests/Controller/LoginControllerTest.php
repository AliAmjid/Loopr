<?php

namespace App\Tests\Controller;

use App\Tests\BaseTest;


class LoginControllerTest extends BaseTest {

    public function testGetToken() {
        $client = $this->getClient();
        $response = $client->query(
        /** @lang GraphQL */
            '{getToken(email: "test" , password: "test" ) {token}}
');

        $this->assertNoErrors($response);
        $this->assertEquals('test', $response->getData()['getToken']['token']);
    }
}
