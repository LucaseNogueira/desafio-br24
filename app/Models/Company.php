<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    public function __construct($name = null, $email = null)
    {
        $this->attributes['title'] = $name;
        $this->attributes['email'] = $email;
    }

    public function getId(){
        return $this->attributes['id'];
    }

    public function getName(){
        return $this->attributes['title'];
    }

    public function getEmail(){
        return $this->attributes['email'];
    }

    public function setId($id){
        $this->attributes['id'] = $id;
    }

    public function setName($name){
        return $this->attributes['title'] = $name;
    }

    public function setEmail($email){
        return $this->attributes['email'] = $email;
    }

    public function contact(){
        return $this->hasMany(Contact::class, 'company_id', 'id');
    }
}
