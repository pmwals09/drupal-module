<?php
namespace Drupal\react_app\Services;

use Drupal\Core\Database\Connection;
use Drupal\react_app\Model\DayModel;
use Drupal\react_app\Model\ResponseModel;
use Exception;
use PDO;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class DayService {
  private $database;
  
  public function __construct(Connection $database) {
    $this->database = $database;
  }
  
  public function save(ResponseModel $values) {
    try { 
      $this->database->upsert('submission_day')
        ->fields($values->toArray())
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
        SELECT day, month, year, location, question, answer, SUM(answer_count) AS answer_count
        FROM submission_day
        GROUP BY day, month, year, location, question, answer
      ');
      return $query->fetchAll(PDO::FETCH_CLASS, 'Drupal\react_app\Model\DayModel');
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
    try {
      $this_month = date('n');
      $query = $this->database->query("
        SELECT day, month, year, location, question, answer, SUM(answer_count) AS answer_count
        FROM submission_day
        WHERE NOT month='".$this_month."'
        GROUP BY day, month, year, question, answer, location
      ");
      $responses = $query->fetchAll(PDO::FETCH_CLASS, 'Drupal\react_app\Model\DayModel');
      $monthManager = \Drupal::service('react_app.month_service');
      
      /** @var DayModel $values */
      foreach ($responses as $values) {
        $monthManager->save($values);
      }
      \Drupal::logger('react_app')->notice("Agreggated day responses");

      $this->deleteLastMonth($this_month);
    }
    catch(Exception $ex) {
      \Drupal::logger('react_app')->error($ex->getMessage());
    }
  }
  private function deleteLastMonth($this_month) {
     try {
      $query = $this->database->query("
        DELETE FROM submission_day
        WHERE NOT month='".$this_month."'
      ");
    }
    catch(Exception $ex){
        \Drupal::logger('react_app')->error($ex->getMessage());
    }
  }

}