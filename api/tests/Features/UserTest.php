<?php


namespace App\Tests\Features;


use App\Entity\User;
use App\Enum\AclResourceEnum;
use App\GraphqlClient\GraphQLClient;
use App\Tests\BaseTestCase;
use Nette\Utils\Random;
use Softonic\GraphQL\Response;

class UserTest extends BaseTestCase
{
    public function testListAllUsers()
    {
        $query = /** @lang GraphQL */
            '
            query {
            users{edges{node{email,name}}}
            }
        ';
        $this->assertSecurityResources(
            [AclResourceEnum::LIST_ALL_USERS],
            function (User $user) use ($query) : Response {
                $client = $this->createLoggedClient($user->getEmail());
                return $client->query($query);
            }
        );
    }

    public function testCreateAndUpdateUser()
    {
        $createQuery = /** @lang GraphQL */
            '
            mutation createUser($email: String!, $name: String!, $role: String! ){
              createUser(
                input: {
                  email: $email
                  name: $name
                  role: $role
                }
              ) {
                user {
                  id,
                  _id,
                  name
                }
              }
            }
';
        $client = $this->createLoggedClient($this->createRandomUser('test', [AclResourceEnum::CREATE_USER])->getEmail());
        $response = $client->query($createQuery, [
            'email' => Random::generate(5, 'a-z') . '@loopr-testing.cz',
            'name' => Random::generate(),
            'role' => 'acl_roles/' . $this->createRoleWithResources([AclResourceEnum::USER_LOGGED])->getId(),
        ]);
        $this->assertNoErrors($response);
        $idUser = $response->getData()['createUser']['user']['_id'];
        $iri = $response->getData()['createUser']['user']['id'];
        $user = $this->em->find(User::class, $idUser);
        $this->assertNotNull($user);

        $editQuery = /** @lang GraphQL */
            '
            mutation editUser($id: ID!, $email: String!, $name: String!, $role: String! ){
              editUser(
                input: {
                  id: $id
                  email: $email
                  name: $name
                  role: $role
                }
              ) {
                user {
                  id
                  name
                }
              }
            }
';

        $client = $this->createLoggedClient($this->createRandomUser('test', [AclResourceEnum::EDIT_USER])->getEmail());
        $client->query($editQuery, [
            'id' => $iri,
            'email' => Random::generate(5, 'a-z') . '@loopr-testing.cz',
            'name' => Random::generate(),
            'role' => 'acl_roles/' . $this->createRoleWithResources([AclResourceEnum::USER_LOGGED])->getId(),
        ]);


    }


    public function testGetUser()
    {
        $query = 'query getUser($id: ID!) {
  user(id: $id) {
    roles
    email
    password
  }
}';
        $user = $this->createRandomUser('test', [AclResourceEnum::SEE_USER]);
        $client = $this->createLoggedClient($user->getEmail());
        $r = $client->query($query, [
            'id' => 'users/' . $user->getId(),
        ]);

        $this->assertNoErrors($r);

    }
}
