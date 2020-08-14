<?php

namespace App\Security\Voter;

use App\Entity\User;
use App\Enum\AclResourceEnum;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class BasicResourceVoter extends Voter {
    protected function supports($attribute, $subject) {
        return in_array($attribute, array_keys(AclResourceEnum::PROP_UUIDS));
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token) {
        /** @var User $user */
        $user = $token->getUser();
        return $user->getRole()->hasResource($attribute);
    }
}
