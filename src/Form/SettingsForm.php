<?php

namespace Drupal\react_app\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Database\Database;

class SettingsForm extends ConfigFormBase {

  public function getFormId() {
    return 'settings_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('react_app.settings');

    $form['default_count'] = [
      '#type' => 'number',
      '#description' => 'This is the default count',
      '#title' => $this->t('Default count'),
      '#default_value' => $config->get('default_count'),
    ];

    return parent::buildForm($form, $form_state);
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('react_app.settings');
    $config->set('default_count', $form_state->getValue('default_count'));
    $config->save();
    parent::submitForm($form, $form_state);
  }

  protected function getEditableConfigNames() {
    return ['react_app.settings'];
  }

}
