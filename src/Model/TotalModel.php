<?php
namespace Drupal\react_app\Model;

class TotalModel extends BaseModel {
  public string $question = '';
  public string $answer = '';
  public string $location = '';
  public int $answer_count = 0;
}