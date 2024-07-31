<?php

declare(strict_types=1);

namespace App\Http\Webhooks;

use Illuminate\Log\Logger;
use Symfony\Component\EventDispatcher\EventDispatcher;

require_once 'vendor/autoload.php';

class BitrixWebhook{

    private string $url;

    public function __construct($url)
    {
        /**
         * Infelizmente não irá na versão 1.0
         * Irei tentar desenvolver a integração com a api numa branch de desenvolvimento.
         * Se conseguir eu movo todo o desenvolvimento para produção após a analise técnica.
         */
        // $log = new ServiceBuilderFactory(new EventDispatcher(), new Logger('bitrix24-php-sdk'));
    }
}
