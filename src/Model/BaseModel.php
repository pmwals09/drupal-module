<?php
namespace Drupal\react_app\Model;

class BaseModel {
  public function toArray() {
    $v = get_object_vars($this);
    return $v;
  }
}