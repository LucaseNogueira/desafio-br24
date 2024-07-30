<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    public function __construct($name = null, $lastName = null)
    {
        $this->attributes['name'] = $name;
        $this->attributes['last_name'] = $lastName;
    }

    public function getId(){
        return $this->attributes['id'];
    }

    public function getName(){
        return $this->attributes['name'];
    }

    public function getLastName(){
        return $this->attributes['last_name'];
    }

    public function setId($id){
        $this->attributes['id'] = $id;
    }

    public function setName($name){
        return $this->attributes['name'] = $name;
    }

    public function setLastName($email){
        return $this->attributes['last_name'] = $email;
    }

    public function company(){
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }
}
