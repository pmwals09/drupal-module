<?php
namespace Drupal\react_app\Controller;

use Drupal\react_app\Services\DayService;
use Drupal\Core\Controller\ControllerBase;
use Drupal\react_app\Model\ResponseModel;
use Symfony\Component\DependencyInjection\ContainerInterface;

class SubmissionDayController extends ControllerBase {
  public function __construct(DayService $dayService)
  {
    $this->dayService = $dayService;
  }
  public static function create(ContainerInterface $container)
  {
    $dayService = $container->get('react_app.day_service');
    return new static($dayService);
  }
  public function save(ResponseModel $values) {
    $this->dayService->save($values);
  }

  public function report() {
   return $this->dayService->report();
  }

  public function aggregate() {
    $this->dayService->aggregate();
  }
}