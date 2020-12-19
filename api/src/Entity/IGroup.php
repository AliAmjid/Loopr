<?php


namespace App\Entity;


use Doctrine\Common\Collections\Collection;

interface IGroup
{
    /**
     * @return User[]
     */
    public function getUsers(): array;

    public function getSection(): string;

    /**
     * @return Subject[]|Collection
     */
    public function getSubjects();

    public function addUser(User $user): User;

    public function deleteUser(User $user): User;
}
