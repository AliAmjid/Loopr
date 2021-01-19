<?php


namespace App\Schema;


use ApiPlatform\Core\GraphQl\Type\SchemaBuilderInterface;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Schema;
use TheCodingMachine\GraphQLite\SchemaFactory;

class SchemaBuilder implements SchemaBuilderInterface
{
    public function __construct(
        private \ApiPlatform\Core\GraphQl\Type\SchemaBuilder $apiPlatformSchemaBuilder,
        private SchemaFactory $graphqliteSchemaBuilder
    ) {
    }

    public function getSchema(): Schema
    {
        $apiPlatformSchema = $this->apiPlatformSchemaBuilder->getSchema();
        $graphqliteSchema = $this->graphqliteSchemaBuilder->createSchema();

        $queryFields = [];
        $queryInterfaces = [];
        $mutationFields = [];
        $mutationInterfaces = [];

        foreach ($apiPlatformSchema->getQueryType()->getFields() as $field) {
            $queryFields[] = $field;
        }

        foreach ($graphqliteSchema->getQueryType()->getFields() as $field) {
            $queryFields[] = $field;
        }

        foreach ($apiPlatformSchema->getQueryType()->getInterfaces() as $field) {
            $queryInterfaces[] = $field;
        }

        foreach ($graphqliteSchema->getQueryType()->getInterfaces() as $field) {
            $queryInterfaces[] = $field;
        }

        foreach ($graphqliteSchema->getMutationType()->getFields() as $field) {
            $mutationFields[] = $field;
        }

        foreach ($apiPlatformSchema->getMutationType()->getFields() as $field) {
            $mutationFields[] = $field;
        }

        foreach ($graphqliteSchema->getMutationType()->getInterfaces() as $field) {
            $mutationInterfaces[] = $field;
        }

        foreach ($apiPlatformSchema->getMutationType()->getInterfaces() as $field) {
            $mutationInterfaces[] = $field;
        }

        $directives = array_merge($apiPlatformSchema->getDirectives(), $graphqliteSchema->getDirectives());
        $types = array_merge($apiPlatformSchema->getConfig()->getTypes(),
            call_user_func($graphqliteSchema->getConfig()->getTypes()));

        $typeLoader = function ($name) use ($apiPlatformSchema, $graphqliteSchema) {
            $apiPlatform = $apiPlatformSchema->getConfig()->getTypeLoader();
            $graphqlite = $graphqliteSchema->getConfig()->getTypeLoader();

            $result = $apiPlatform($name);
            if ($result) {
                return $result;
            } else {
                return $graphqlite($name);
            }
        };
        return new Schema([
            'query' => new \GraphQL\Type\Definition\ObjectType([
                'name' => 'Query',
                'fields' => $queryFields,
                'interfaces' => $queryInterfaces
            ]),
            'mutation' => new ObjectType([
                'name' => 'Mutation',
                'fields' => $mutationFields,
                'interfaces' => $mutationInterfaces
            ]),
            'directives' => $directives,
            'types' => $types,
            'typeLoader' => $typeLoader
        ]);
    }
}
