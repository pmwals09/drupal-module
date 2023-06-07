<?php
namespace Drupal\react_app\Services;

use Drupal\Core\Database\Connection;
use Drupal\react_app\Model\DayModel;
use Drupal\react_app\Model\ResponseModel;
use Exception;
use PDO;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;


class ResponseService {
  private $database;
  
  public function __construct(Connection $database) {
    $this->database = $database;
  }

  public function save(Request $request) {
    $values = $request->request->all();
    try {
      $model = new ResponseModel();
      $model->day = $values['day'] ?? date("j");
      $model->month = $values['month'] ?? date("n"); 
      $model->year = $values['year'] ?? date("Y"); 
      $model->location = $values['location'] ?? 'nmnh';
      $model->question = $values['question'];
      $model->answer = $values['answer'];
      
      $form = $model->toArray();
      unset($form['answer_count']);

      $this->database->upsert('day_responses')
        ->fields($form)
        ->key("noKey")
        ->execute();

      $this->database->upsert('all_responses')
        ->fields([
          'date' => $model->toDateString(),
          'location' => $form['location'],
          'question' => $form['question'],
          'answer' => $form['answer']
        ])
        ->key("noKey")
        ->execute();

      $this->database->merge('submission_total')
        ->key(['location', 'question', 'answer'], [$form['location'], $form['question'], $form['answer']])
        ->fields([
          'location' => $form['location'],
          'question' => $form['question'],
          'answer' => $form['answer'],
          'answer_count' => '1'
        ])
        ->expression('answer_count', 'answer_count + :inc', [':inc' => 1])
        ->execute();
      return new JsonResponse(JsonResponse::HTTP_OK);
    }
    catch(Exception $ex){
      \Drupal::logger('react_app')->error($ex->getMessage());
      return new JsonResponse(JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
    }
  }

  private function getData() {
    try {
      $query = $this->database->query("
        SELECT day, month, year, location, question, answer, COUNT(1) AS answer_count
        FROM day_responses
        GROUP BY day, month, year, question, answer, location
      ");
      return $query->fetchAll(PDO::FETCH_CLASS, 'Drupal\react_app\Model\ResponseModel');
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
    /*  We are only aggregating yesterday's responses and leaving today's to account 
    for variability in timing of cron runs. Make sure nothing gets skipped or double counted if
    data from multiple dates in day_responses */
    try {
      $today = date('j');
      $query= $this->database->query("
        SELECT day, month, year, location, question, answer, COUNT(1) AS answer_count
        FROM day_responses
        WHERE NOT day='".$today."'
        GROUP BY day, month, year, question, answer, location
      ");
      
      $day_responses = $query->fetchAll(PDO::FETCH_CLASS, 'Drupal\react_app\Model\ResponseModel');
      $dayManager = \Drupal::service('react_app.day_service');
     
      /** @var ResponseModel $values */
      foreach ($day_responses as $values) {
        $dayManager->save($values);
      }
      \Drupal::logger('react_app')->notice("Tallied daily responses to day");

      $this->deleteYesterday($today);
      
    }
    catch(Exception $ex) {
      \Drupal::logger('react_app')->error($ex->getMessage());
    }
  }

  private function deleteYesterday($today) {
     try {
      $query = $this->database->query("
        DELETE FROM day_responses
        WHERE NOT day='".$today."'
      ");
    }
    catch(Exception $ex){
        \Drupal::logger('react_app')->error($ex->getMessage());
    }
  }
}