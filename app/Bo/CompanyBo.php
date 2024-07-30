<?php

namespace App\Bo;
use App\Models\Company;

class CompanyBo{

    public static function create($args){
        $company = new Company(
            $args['company_name'],
            $args['company_email']
        );
        $company->save();
        $args['company'] = $company;

        ContactBo::create(ContactBo::arguments($args, '1'));
        ContactBo::create(ContactBo::arguments($args, '2'));

        return $company;
    }
    public static function update($args, $id){
        $company = Company::with('contact')->find($id);
        $company->setName($args['company_name']);
        $company->setEmail($args['company_email']);
        $company->update();
        $args['company'] = $company;

        ContactBo::update($args, $company);

        return $company;
    }
}
