<?php


namespace App\Controller;


use ApiPlatform\Core\GraphQl\Resolver\QueryCollectionResolverInterface;
use App\Entity\SchoolPeriod;
use App\Error\ClientError;
use App\Error\ClientErrorType;
use App\Helper\IriHelper;
use App\Repository\SchoolPeriodRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetCurrentHalfYearSchoolPeriodController extends AbstractController implements QueryCollectionResolverInterface
{

    public function __invoke(iterable $collection, array $context): iterable
    {
        $em = $this->getDoctrine()->getManager();
        /** @var SchoolPeriodRepository $schoolPeriodRepository */
        $schoolPeriodRepository = $em->getRepository(SchoolPeriod::class);
        $active = $schoolPeriodRepository->findActive();
        if (!$active) {
            throw new ClientError(ClientErrorType::NO_SCHOOL_PERIOD_ACTIVE);
        }

        if ($active->getQuarter() % 2 === 0) {
            $otherPeriod = $schoolPeriodRepository->findByQuarterNYear(
                $active->getQuarter() - 1,
                $active->getSchoolYear()
            );
            return [
                $otherPeriod,
                $active,
            ];
        } else {
            $otherPeriod = $schoolPeriodRepository->findByQuarterNYear(
                $active->getQuarter() + 1,
                $active->getSchoolYear()
            );
            return [
                $active,
                $otherPeriod
            ];
        }
    }

}
