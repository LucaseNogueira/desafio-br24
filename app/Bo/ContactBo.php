<?php

namespace App\Bo;
use App\Models\Contact;

class ContactBo{

    public static function create($args){
        $contact = new Contact(
            $args['contact_name'],
            $args['contact_last_name']
        );

        $args['company']->contact()->save($contact);

        return $contact;
    }
    public static function update($args, $company){
        $contacts = [];
        foreach($company->contact as $key => $contact){
            $index = $key + 1;
            $values = self::arguments($args, $index);
            $contact->setName($values['contact_name']);
            $contact->setLastName($values['contact_last_name']);
            $contact->update();

            $contacts = $contact;
        }

        return $contacts;
    }

    public static function arguments($args, $index){
        return [
            'contact_name' => $args['contact_name_' . $index] ? $args['contact_name_' . $index] : "",
            'contact_last_name' => $args['contact_last_name_' . $index] ? $args['contact_last_name_' . $index] : "",
            'company' => $args['company']
        ];
    }
}
