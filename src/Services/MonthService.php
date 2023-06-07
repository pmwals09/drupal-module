<?php
namespace Drupal\react_app\Services;

use Drupal\Core\Database\Connection;
use Drupal\react_app\Model\DayModel;
use Drupal\react_app\Model\MonthModel;
use Exception;
use PDO;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class MonthService {

  private $database;
  
  public function __construct(Connection $database) {
    $this->database = $database;
  }

  public function save(DayModel $values) {
    try {
      $fields = $values->toArray();
     
      $this->database->upsert('submission_month')
        ->fields($fields)
        ->key("noKey")
        ->execute();
    }
    catch(Exception $ex){
       \Drupal::logger('react_app')->error($ex->getMessage());
    }
  }

  private function getData() {
    try {
      $query = $this->database->query('
        SELECT month, year, location, question, answer, SUM(answer_count) AS answer_count
        FROM submission_month
        GROUP BY month, year,location, question, answer
      ');
      return $query->fetchAll(PDO::FETCH_CLASS, 'Drupal\react_app\Model\MonthModel');
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

  public function aggregate() {
    $this_year = date('Y');
    try {
      $query = $this->database->query("
        SELECT  month, year, location, question, answer, SUM(answer_count) answer_count
        FROM submission_month
        WHERE NOT year='".$this_year."'
        GROUP BY month, year, question, answer, location
      ");
      $responses = $query->fetchAll(PDO::FETCH_CLASS, 'Drupal\react_app\Model\MonthModel');
      $yearManager = \Drupal::service('react_app.year_service');

      /** @var MonthModel $values */
      foreach ($responses as $values) {
        $yearManager->save($values);
      }
      \Drupal::logger('react_app')->notice("Aggregated month responses");
    }
    catch(Exception $ex) {
      \Drupal::logger('react_app')->error($ex->getMessage());
    }
    $this->deleteLastYear($this_year);
  }

  private function deleteLastYear($this_year) {
     try {
      $query = $this->database->query("
        DELETE FROM submission_month
        WHERE NOT year='".$this_year."'
      ");
    }
    catch(Exception $ex){
        \Drupal::logger('react_app')->error($ex->getMessage());
    }
  }
}