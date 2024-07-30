<?php

namespace App\Bo;

interface Bo{
    public static function create($args);
    public static function update($args, $id);
}
