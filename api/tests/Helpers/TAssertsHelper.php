<?php


namespace App\Tests\Helpers;


use App\Entity\User;
use App\Enum\AclResourceEnum;
use Softonic\GraphQL\Response;

trait TAssertsHelper {
    protected function streamOfUsersWithoutResource(array $withoutResource): array {
        $stream = [];
        foreach (AclResourceEnum::PROP_UUIDS as $name => $id) {
            if (!in_array($name, $withoutResource)) {
                $stream[] = $this->createRandomUser('test', [$name]);
            }
        }
        return $stream;
    }

    protected function assertSecurityResources(array $resourceWhichCanDo, callable $func) {
        $this->assertSecurity(
            $func,
            [$this->createRandomUser('test', $resourceWhichCanDo)],
            $this->streamOfUsersWithoutResource($resourceWhichCanDo)
        );
    }

    protected function assertSecurity(callable $func, array $userCanAccess, array $usersCantAccess = []) {
        /** @var User $user */
        foreach ($userCanAccess as $user) {
            /** @var Response $response */
            $response = $func($user, true);
            if ($response->hasErrors()) {
                $resources = implode(', ', $user->getRole()->getResources()->toArray());
                throw new \Exception("User with resources {$resources} should have access this endpoint but error detected");
            }
        }
        /** @var User $user */
        foreach ($usersCantAccess as $user) {
            /** @var Response $response */
            $response = $func($user, false);
            if (!$response->hasErrors()) {
                $resources = implode(', ', $user->getRole()->getResources()->toArray());
                throw new \Exception("User with resources {$resources} should NOT access this endpoint but no error detected");
            }
        }
    }

}
