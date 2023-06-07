<?php

namespace Drupal\react_app\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\react_app\Services\CsvService;

class CsvForm extends FormBase {

  public function __construct(CsvService $csvService) {
    $this->csvService = $csvService;
  }

  public static function create(ContainerInterface $container) {
    $csvService = $container->get('react_app.csv_service');
    return new static($csvService);
  }

  public function getFormId() {
    return 'react_app_csv_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state){
    $form['description'] = [
      '#type' => 'item',
      '#markup' => $this->t('<p>Please choose the date range (inclusive) of chatbot data you want to export.</p><p>You may specify an exact range, or you may select only a "from" date to export everything after that date, or select only a "to" date to export everything before that date.</p><p> Check "Export All" to get all chatbot responses from all dates.</p> <p>A CSV file with your data will download in your browser.</p>')
    ];

    $form['export_start'] = [
      '#type' => 'date',
      '#title' => $this->t('Export from:'),
      '#attributes' => [
        'name' => 'export_start'
      ]
      
    ];

    $form['export_end'] = [
      '#type' => 'date',
      '#title' => $this->t('Export to:'),
      '#attributes' => [
        'name' => 'export_end'
      ]
    ];
    $form['export_all'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Export all data'),
      '#prefix' => '<p><b>OR</b></p>',
      '#attributes' => [
        'name' => 'export_all',
      ],
    ];

    $form['actions'] = [
      '#type' => 'actions'
    ];
    
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Export Data'),
      '#states' => [
        'enabled' => [
          [':input[name="export_end"]' => ['!value' => ""]],
          'or',
          [':input[name="export_start"]' => ['!value' => ""]],
          'or',
          [':input[name="export_all"]' => ['checked' => TRUE]]
        ]
      ]
    ];
   
    $form['#cache'] = ['max-age' => 0];
    return $form;
  }

  public function validateForm(array &$form, FormStateInterface $form_state){
    $export_start = $form_state->getValue('export_start');
    $export_end = $form_state->getValue('export_end');

    if($export_start && $export_end && $export_start > $export_end){
      $form_state->setErrorByName('submit_end', $this->t("Range end date must be later than range start date"));
    }
    if(($export_start || $export_end) && $form_state->getValue('export_all') == 1){
      $form_state->setError($form, ['#markup' => $this->t("Please choose <em>either</em> a range of dates <em>or</em> check the box to export all data.")]);
    }

  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->csvService->exportCsv($form_state);
  }
    
}