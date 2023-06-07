<?php

namespace Drupal\react_app\Services;

use Drupal\Core\Database\Connection;
use Exception;
use PDO;
use Symfony\Component\HttpFoundation\JsonResponse;

class TotalService {
  private $database;
  
  public function __construct(Connection $database) {
    $this->database = $database;
  }
  private function getData() {
    try {
     
      $query = $this->database->query('
        SELECT * FROM submission_total
      ');
      return (array) $query->fetchAll(PDO::FETCH_CLASS, 'Drupal\react_app\Model\TotalModel');
    }
    catch(Exception $ex){
        \Drupal::logger('react_app')->error($ex->getMessage());
    }
  }

  public function report() {
    $data = $this->getData();
    $response = $data ? new JsonResponse($data) : new JsonResponse();  
    return $response;
  }
}