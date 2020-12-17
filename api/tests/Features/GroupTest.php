<?php


namespace App\Tests\Features;


use App\Entity\User;
use App\Enum\AclResourceEnum;
use App\GraphqlClient\GraphQLClient;
use App\Tests\BaseTestCase;
use Nette\Utils\Random;
use Softonic\GraphQL\Client;
use Softonic\GraphQL\Response;

class GroupTest extends BaseTestCase
{
    public function testUpdateUsersCLassGroup()
    {
        $userEntity = $this->createRandomUser('test', AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_ADMIN']);
        $client = $this->client($userEntity->getEmail());
        $classGroupResponse = $this->clientLibrary($client)->createClassGroup(
            '2020',
            Random::generate(3, 'a-z'),
            'users/' . $userEntity->getId()
        );
        $this->assertNoErrors($classGroupResponse);
        $classGroupIri = $classGroupResponse->getData()['createClassGroup']['classGroup']['id'];
        $users = [
            'users/' . $this->createRandomUser('test', AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_USER'])->getId(),
            'users/' . $this->createRandomUser('test', AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_USER'])->getId()
        ];
        $response = $this->clientLibrary($client)->updateUsersClassGroup($classGroupIri, $users, []);
        $this->assertNoErrors($response);
        $this->assertEquals(
            count($users),
            count($response->getData()['updateUsersClassGroup']['classGroup']['users']['edges'])
        );
        /** @var User $userEntity */
        $userEntity = $this->em->find(User::class, explode('/', $users[0])[1]);
        $this->em->refresh($userEntity);
        $this->assertSame($classGroupResponse->getData()['createClassGroup']['classGroup']['_id'],
            $userEntity->getClassGroup()->getId());
        $response = $this->clientLibrary($client)->updateUsersClassGroup($classGroupIri, [], [$users[0]]);
        $this->assertNoErrors($response);
        $this->assertEquals(
            count($users) - 1,
            count($response->getData()['updateUsersClassGroup']['classGroup']['users']['edges'])
        );
    }

    public function testUpdateUsersGroup()
    {
        $loggedUser = $this->createRandomUser('test', AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_ADMIN']);
        $client = $this->client($loggedUser->getEmail());
        $createGroupResponse = $this->clientLibrary($client)->createGroup(Random::generate(8, 'a-z'));
        $groupUri = $createGroupResponse->getData()['createGroup']['group']['id'];
        $users = [
            'users/' . $this->createRandomUser('test', AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_USER'])->getId(),
            'users/' . $this->createRandomUser('test', AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_USER'])->getId(),
            'users/' . $this->createRandomUser('test', AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_USER'])->getId(),
            'users/' . $this->createRandomUser('test', AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_USER'])->getId(),
        ];

        $response = $this->clientLibrary($client)->updateUsersGroup($groupUri, $users, []);
        $this->assertEquals(
            count($users),
            count($response->getData()['updateUsersGroup']['group']['users']['edges'])
        );
    }

}
