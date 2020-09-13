<?php


namespace App\Tests\Features;


use App\Entity\User;
use App\Enum\AclResourceEnum;
use App\GraphqlClient\GraphQLClient;
use App\Tests\BaseTestCase;
use Softonic\GraphQL\Response;

class UserTest extends BaseTestCase {
    public function testListAllUsers() {
        $query = /** @lang GraphQL */
            '
            query {
            users{edges{node{username,name}}}
            }
        ';
        $this->assertSecurityResources(
            [AclResourceEnum::LIST_ALL_USERS],
            function (User $user) use ($query) : Response {
                $client = $this->createLoggedClient($user->getUsername());
                return $client->query($query);
            }
        );
    }
}
