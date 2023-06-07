<?php

namespace Drupal\react_app\Services;

use Drupal\Core\Database\Connection;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Url;

class CsvService {
  private $database;
  private $messenger;
  
  public function __construct(Connection $database, MessengerInterface $messenger) {
    $this->database = $database;
    $this->messenger = $messenger;
  }

  public function exportCsv(FormStateInterface $form_state) {
    $start_date = $form_state->getValue('export_start');
    $end_date = $form_state->getValue('export_end');

    $data = $this->getData($start_date, $end_date);
    
    if($data){
      $file_id=rand();
      $file_name = 'csv_data_' . $id . '.csv';
      $file_url = \Drupal::service('file_url_generator')->generate("public://csv_data_$file_id.csv"); 
      
      $file = fopen('.' . $file_url->toString(),'w');
     
      fputcsv($file, ['date','location','question','answer']);

      foreach($data as $response){
        $fields = [
          'date' => $response->date,
          'location' => $response->location,
          'question' => $response->question,
          'answer' => $response->answer,
        ];
        
        fputcsv($file, $fields);
      }
      if($file){
        $date_string = date('Y-m-d');
        $headers = [
          'Content-Length' => $this->getFileSize($file_url),
          'Content-Type' => '.csv',
          'Content-Disposition' => "attachment; filename=csv_data_$date_string.csv",
          'Cache-Control' => 'no-store'
        ];

        $response = new Response($this->getFileContent($file_url), 200, $headers);
        $response->setCache([
          'max_age' => 0
        ]);

        $form_state->setResponse($response);
        unlink('.' . $file_url->toString());
      }
    } else {
      $this->messenger->addError('There is no data to export for the selected range.');
      return;
    }
  }

  private function getData($start_date, $end_date){
    $query = $this->database->select('all_responses','r')->fields('r',['rid','date','location','question','answer']);
   
    if($start_date){
       $query->condition('date', $start_date, '>=');
    }
    if($end_date){
      $query->condition('date', $end_date, '<=');
    }
      
    $query->orderBy('date');
    if($query->countQuery()->execute()->fetchField() !== "0"){
      $results = $query->execute();
      return $results;
    } else {
      return FALSE;
    }
  }

  private function getFileSize(Url $file_url) {
    return mb_strlen($this->getFileContent($file_url), '8bit');
  }

  private function getFileContent(Url $file_url){
    $url = \Drupal::request()->getSchemeAndHttpHost() . $file_url->toString();
    
    return (string) \Drupal::httpClient()->get($url)->getBody();
  }

}