<?php
namespace Drupal\react_app\Model;

class ResponseModel extends DayModel {
  public function toDateString(){
    $date = $this->year . "-" . $this->month . "-" . $this->day;
    return $date;
  }
}