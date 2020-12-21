<?php


namespace App\Helper;


use App\Error\ClientError;
use App\Error\ClientErrorType;

class IriHelper
{
    public static function getIdFromIri(string $iri)
    {
        if ($iri[0] == '/') {
            $iri = substr($iri, 1);
            $iri = explode('/', $iri);
            if (count($iri) === 2) {
                return $iri[1];
            }
        }

        throw new ClientError(ClientErrorType::INVALID_IRI);
    }
}
