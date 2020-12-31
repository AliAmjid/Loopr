<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\QueryItemResolverInterface;
use App\Entity\SchoolPeriod;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use App\Repository\SchoolPeriodRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetCurrentSchoolPeriodController extends AbstractController implements QueryItemResolverInterface
{
    public function __invoke($item, array $context)
    {
        /** @var SchoolPeriodRepository $repository */
        $repository = $this->getDoctrine()->getRepository(SchoolPeriod::class);
        return $repository->findActive() ?? throw new ClientError(ClientErrorType::NO_SCHOOL_PERIOD_ACTIVE);
    }
}
