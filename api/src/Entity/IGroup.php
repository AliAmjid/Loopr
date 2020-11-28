<?php


namespace App\Entity;


use Doctrine\Common\Collections\Collection;

interface IGroup
{
    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection;

    public function getYear(): int;

    public function getSection(): string;
}
