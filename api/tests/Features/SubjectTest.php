<?php


namespace App\Tests\Features;


use App\GraphqlClient\GraphQLClient;
use App\Tests\BaseTestCase;
use Softonic\GraphQL\Response;

class SubjectTest extends BaseTestCase
{

    public function createSubjectType(
        GraphQLClient $client,
        string $name
    ): Response {
        return $client->query(
        /** @lang GraphQL */
            '
            mutation createSubjectType($name: String!) {
              createSubjectType(input: { name: $name }) {
                subjectType {
                  id,
                  _id,
                  name
                }
              }
            }
',
            [
                'name' => $name
            ]
        );
    }

    public function createSubject(
        GraphQLClient $client,
        string $subject,
        string $teacher,
        ?string $group,
        ?string $classGroup
    ) {
        $client->query(
        /** @lang GraphQL */
            '
    mutation createSubject(

    )
                '
        );
    }
}
