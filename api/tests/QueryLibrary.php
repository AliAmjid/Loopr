<?php


namespace App\Tests;


use App\GraphqlClient\GraphQLClient;
use Softonic\GraphQL\Response;

class QueryLibrary
{
    private GraphQLClient $client;

    public function __construct(
        GraphQLClient $client
    ) {
        $this->client = $client;
    }

    public function createSubjectType(
        string $name
    ): Response {
        return $this->client->query(
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

    public function createSubjectWithGroup(
        string $subjectType,
        string $teacher,
        string $group
    ) {
        return $this->client->query(
        /** @lang GraphQL */
            '
            mutation createSubjetWithGroup(
              $group: String!
              $teacher: String!
              $subjectType: String!
            ) {
              createSubject(
                input: { group: $group, teacher: $teacher, subjectType: $subjectType }
              ) {
                subject {
                  id
                  group {
                    id
                  }
                  teacher {
                    id
                  }
                  subjectType {
                    id
                  }
                }
              }
            }',
            [
                'group' => $group,
                'subjectType' => $subjectType,
                'teacher' => $teacher
            ]
        );
    }

    public function updateSubjectWithGroup()
    {

    }

    public function createSubjectWithClassGroup(
        string $subject,
        string $teacher,
        string $classGroup
    ) {
        return $this->client->query(
        /** @lang GraphQL */
            '
            mutation createSubjetWithClassGroup(
              $classGroup: String!
              $teacher: String!
              $subjectType: String!
            ) {
              createSubject(
                input: { classGroup: $classGroup, teacher: $teacher, subjectType: $subjectType }
              ) {
                subject {
                  id
                  group {
                    id
                  }
                  teacher {
                    id
                  }
                  subjectType {
                    id
                  }
                }
              }
            }',
            [
                'group' => $classGroup,
                'subject' => $subject,
                'teacher' => $teacher
            ]
        );
    }


    public function createClassGroup(
        int $year,
        string $section,
        ?string $teacher
    ): Response {
        return $this->client->query(
        /** @lang GraphQL */
            '
            mutation createClassGroup($year: Int!, $section: String!, $teacher: String) {
              createClassGroup(
                input: { year: $year, section: $section, teacher: $teacher }
              ) {
                classGroup {
                  id,
                  _id
                  section
                  year
                  users {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }
              }
            }',
            [
                'year' => $year,
                'section' => $section,
                'teacher' => $teacher
            ]
        );
    }

    public function createGroup(
        string $section
    ): Response {
        return $this->client->query(
        /** @lang GraphQl */
            'mutation createGroup($section: String!) {
              createGroup(input: { section: $section }) {
                group {
                  id,
                  _id
                  subjects {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                  users {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }
              }
            }',
            [
                'section' => $section
            ]
        );
    }


    public function updateUsersClassGroup(
        string $id,
        array $addUsers,
        array $deleteUsers
    ): Response {
        return $this->client->query(
        /** @lang GraphQL */ '
                        mutation  updateUsersClassGroup($id:ID!, $addUsers: [ID], $deleteUsers: [ID]){
              updateUsersClassGroup(input: { id: $id, addUsers: $addUsers, deleteUsers: $deleteUsers }) {
                classGroup {
                  id
                  users {
                    edges {
                      node {
                        id,
                        _id
                      }
                    }
                  }
                }
              }
            }

            ', [
                'id' => $id,
                'addUsers' => $addUsers,
                'deleteUsers' => $deleteUsers
            ]
        );
    }

    public function updateUsersGroup(
        string $id,
        array $addUsers,
        array $deleteUsers
    ): Response {
        return $this->client->query(
        /** @lang GraphQL */ 'mutation updateUsersGroup($id: ID!, $addUsers: [ID], $deleteUsers: [ID]) {
              updateUsersGroup(
                input: { id: $id, addUsers: $addUsers, deleteUsers: $deleteUsers }
              ) {
                group {
                  id
                  users {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }
              }
            }', [
                'id' => $id,
                'addUsers' => $addUsers,
                'deleteUsers' => $deleteUsers
            ]
        );
    }
}
