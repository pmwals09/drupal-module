<?php
namespace Drupal\react_app\Controller;

use Drupal\react_app\Model\MonthModel;
use Drupal\react_app\Services\YearService;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Controller\ControllerBase;

class SubmissionYearController extends ControllerBase {

  public function __construct(YearService $yearService)
    {
      $this->yearService = $yearService;
    }
  public static function create(ContainerInterface $container)
    {
      $yearService = $container->get('react_app.year_service');
      return new static($yearService);
    }
  
  public function save(MonthModel $values){
    $this->yearService->save($values);
  }

  public function report() {
    return $this->yearService->report();
  }
}