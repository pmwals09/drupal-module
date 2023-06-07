<?php
namespace Drupal\react_app\Services;

use Drupal\Core\Database\Connection;
use Drupal\react_app\Model\MonthModel;
use Exception;
use PDO;
use Symfony\Component\HttpFoundation\JsonResponse;

class YearService {
  private $database;
  
  public function __construct(Connection $database) {
    $this->database = $database;
  }

  private function getData() {
    try {
      $query = $this->database->query('
        SELECT year,location, question, answer, SUM(answer_count) AS answer_count
        FROM submission_year
        GROUP BY year, location, question, answer
      ');
      return (array) $query->fetchAll(PDO::FETCH_CLASS, 'Drupal\react_app\Model\YearModel');
    }
    catch(Exception $ex){
      \Drupal::logger('react_app')->error($ex->getMessage());
    }
  }

  public function save(MonthModel $values) {
    try {
      $fields = $values->toArray();
    
      $this->database->upsert('submission_year')
        ->fields($fields)
        ->key("noKey")
        ->execute();
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