<?php
namespace Drupal\react_app\Controller;

use Drupal\react_app\Services\TotalService;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Controller\ControllerBase;

class SubmissionTotalController extends ControllerBase {

  public function __construct(TotalService $totalService)
    {
      $this->totalService = $totalService;
    }

  public static function create(ContainerInterface $container)
    {
      $totalService = $container->get('react_app.total_service');
      return new static($totalService);
    }
  
  public function report() {
    return $this->totalService->report();
  }
}