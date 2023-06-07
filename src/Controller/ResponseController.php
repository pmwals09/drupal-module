<?php
namespace Drupal\react_app\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\react_app\Services\ResponseService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ResponseController extends ControllerBase {

  public function __construct(ResponseService $responseService)
  {
    $this->responseService = $responseService;
  }
  public static function create(ContainerInterface $container)
  {
    $responseService = $container->get('react_app.response_service');
    return new static($responseService);
  }

  public function save(Request $request) {
    return $this->responseService->save($request);
  }

  public function report() {
    return $this->responseService->report();
  }
    
  public function aggregate() {
    $this->responseService->aggregate();
  }
}