<?php


namespace App\GraphqlClient;


use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\TransferException;
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
     * @throws \UnexpectedValueException When response body is not a valid json
     * @throws \RuntimeException         When there are transfer errors
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

        } catch (TransferException $e) {
            throw new \RuntimeException('Network Error.' . $e->getMessage(), 0, $e);
        }

        $response = $this->responseBuilder->build($response);
        $this->writeInfo('[RESPONSE] ' . json_encode($response->getData(), JSON_PRETTY_PRINT));
        return $response;
    }

    protected function writeInfo($info) {
        if ($this->writeInfo && $info && strlen($info) > 0) {
            echo PHP_EOL . '================[DEBUG] [GRAPHQL CLIENT]======================' . PHP_EOL;
            echo '[debug] [GraphQl Client]: ' . $info;
        }
    }
}
