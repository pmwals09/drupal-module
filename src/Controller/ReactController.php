<?php
namespace Drupal\react_app\Controller;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Render\Markup;
use Symfony\Component\HttpFoundation\JsonResponse;

class ReactController {
  
  public function chatbot(string $path = 'home', string $subpath = "") {
    $current_path = \Drupal::service('path.current')->getPath();
    $config = \Drupal::config('react_app.settings')->get();
    unset($config['_core']); // added field from `drush cex`

    $build = [
      '#markup' => Markup::create('<div id="react-app"></div>'),
      '#title' => '',
      '#attached' => [
        'library' => 'react_app/dist',
        'drupalSettings' => [
          'react_app' => [
            'intialized' => false,
            'initialRoute' => $current_path,
            'settings' => $config
          ]
        ]
      ],
    ];

    return $build;
  }
}
