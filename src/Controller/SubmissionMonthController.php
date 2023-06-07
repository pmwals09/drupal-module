<?php
namespace Drupal\react_app\Controller;

use Drupal\react_app\Services\MonthService;
use Drupal\react_app\Model\DayModel;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Controller\ControllerBase;

class SubmissionMonthController extends ControllerBase {
  public function __construct(MonthService $monthService)
  {
    $this->monthService = $monthService;
  }
  public static function create(ContainerInterface $container)
  {
    $monthService = $container->get('react_app.month_service');
    return new static($monthService);
  }
  public function save(DayModel $values) {
    $this->monthService->save($values);
  }

  public function report() {
    return $this->monthService->report();
  }

  public function aggregate() {
    $this->monthService->aggregate();
  }
}