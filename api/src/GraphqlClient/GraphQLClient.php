<?php


namespace App\GraphqlClient;


use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\ServerException;
use GuzzleHttp\Exception\TransferException;
use PHPUnit\Exception;
use Softonic\GraphQL\Client;
use Softonic\GraphQL\Response;
use Softonic\GraphQL\ResponseBuilder;

class GraphQLClient {

    private $httpClient;
    private $responseBuilder;
    protected $writeInfo = false;

    public function __construct(ClientInterface $httpClient, ResponseBuilder $responseBuilder, bool $writeInfo = false) {
        $this->httpClient = $httpClient;
        $this->responseBuilder = $responseBuilder;
        $this->writeInfo = $writeInfo;
    }

    /**
     * @param string $query
     * @param array|null $variables
     * @return Response
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function query(string $query, array $variables = null): Response {
        $options = [
            'json' => [
                'query' => $query,
            ],
        ];
        if (!is_null($variables)) {
            $options['json']['variables'] = $variables;
        }

        try {
            $this->writeInfo('[REQUEST] ' . PHP_EOL . json_encode($options, JSON_PRETTY_PRINT));
            $response = $this->httpClient->request('POST', '', $options);

        } catch (\Throwable $e) {
            if($e instanceof ServerException) {
                echo json_encode(json_decode($e->getResponse()->getBody()->__toString()), JSON_PRETTY_PRINT);
            }
            throw new \RuntimeException('Network Error.' . $e->getMessage(), 0, $e);
        }

        $response = $this->responseBuilder->build($response);
        $this->writeInfo('[RESPONSE] ' . json_encode($response->getData(), JSON_PRETTY_PRINT));
        if ($response->hasErrors()) {
            $this->writeInfo('[RESPONSE ERRORS] ' . json_encode($response->getErrors(), JSON_PRETTY_PRINT));
        }

        return $response;
    }

    protected function writeInfo($info) {
        if ($this->writeInfo && $info && strlen($info) > 0) {
            echo PHP_EOL . '================[DEBUG] [GRAPHQL CLIENT]======================' . PHP_EOL;
            echo '[debug] [GraphQl Client]: ' . $info;
        }
    }
}
