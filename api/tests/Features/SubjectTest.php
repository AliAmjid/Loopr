<?php


namespace App\Tests\Features;


use App\Enum\AclResourceEnum;
use App\GraphqlClient\GraphQLClient;
use App\Tests\BaseTestCase;
use Nette\Utils\Random;
use Softonic\GraphQL\Response;

class SubjectTest extends BaseTestCase
{
    public function testCreateUpdateSubject()
    {
        $user = $this->createRandomUser('test', AclResourceEnum::PROP_DEFAULT_ROLES['ROLE_ADMIN']);
        $client = $this->client($user->getEmail());
        $groupResponse = $this->queryLibrary($client)->createGroup(Random::generate(5, 'a-z'));
        $this->assertNoErrors($groupResponse);
        $iriGroup = $groupResponse->getData()['createGroup']['group']['id'];
        $subjectTypeResponse = $this->queryLibrary($client)->createSubjectType(Random::generate(10, 'a-z'));
        $this->assertNoErrors($subjectTypeResponse);
        $iriSubjectType = $subjectTypeResponse->getData()['createSubjectType']['subjectType']['id'];
        $this->assertNotEmpty($iriSubjectType);
        $subjectResponse = $this->queryLibrary($client)->createSubjectWithGroup(
            $iriSubjectType,
            'users/' . $user->getId(),
            $iriGroup
        );
        $this->assertNoErrors($subjectResponse);


    }
}
