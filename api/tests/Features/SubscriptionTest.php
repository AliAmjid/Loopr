<?php


namespace App\Tests\Features;


use App\Enum\AclResourceEnum;
use App\Tests\BaseTestCase;

class SubscriptionTest extends BaseTestCase
{
    public function testSub()
    {
        $user = $this->createRandomUser('test', AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_ADMIN']);
        $client = $this->client($user->getEmail());
        $r = $client->query(
            '
                        subscription {
              updateUserSubscribe(
                input: {
                  id: "/users/23425245-6c99-4aa7-8562-96eb3554bda0"
                  clientSubscriptionId: "idUser"
                }
              ) {
                user {
                  firstname
                  groups {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }
                mercureUrl
                clientSubscriptionId
              }
            }
');

    }
}
