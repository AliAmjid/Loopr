<?php


namespace App\GraphqlClient;


use Softonic\GraphQL\Client;

class GraphQLClientBuilder {
    public static function build(string $endpoint, array $guzzleOptions = []): GraphQLClient {
        $guzzleOptions = array_merge(['base_uri' => $endpoint], $guzzleOptions);

        return new GraphQLClient(
            new \GuzzleHttp\Client($guzzleOptions),
            new \Softonic\GraphQL\ResponseBuilder(),
            true
        );
    }
}
