<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use CodeIgniter\Filters\Cors;
use CodeIgniter\Filters\CSRF;
use CodeIgniter\Filters\DebugToolbar;
use CodeIgniter\Filters\ForceHTTPS;
use CodeIgniter\Filters\Honeypot;
use CodeIgniter\Filters\InvalidChars;
use CodeIgniter\Filters\PageCache;
use CodeIgniter\Filters\PerformanceMetrics;
use CodeIgniter\Filters\SecureHeaders;

class Filters extends BaseConfig
{
    /**
     * Daftar alias filter yang tersedia, termasuk filter custom kita.
     *
     * @var array<string, class-string|list<class-string>>
     */
    public array $aliases = [
        'csrf'          => CSRF::class,
        'toolbar'       => DebugToolbar::class,
        'honeypot'      => Honeypot::class,
        'invalidchars'  => InvalidChars::class,
        'secureheaders' => SecureHeaders::class,
        'cors'          => Cors::class,

        // Filter custom milik kita
        'auth'      => \App\Filters\AuthFilter::class,
        'corsApi'   => \App\Filters\CorsFilter::class,
    ];

    /**
     * GLOBAL FILTERS
     * corsApi diaktifkan secara global agar SEMUA endpoint (termasuk yang publik)
     * dapat menerima request lintas origin (CORS) dari frontend Vue tanpa terblokir browser.
     */
    public array $globals = [
        'before' => [
            'corsApi',
            // 'honeypot',
            // 'csrf',
            // 'invalidchars',
        ],
        'after' => [
            'corsApi',
            // 'toolbar',
            // 'honeypot',
            // 'secureheaders',
        ],
    ];

    public array $methods = [];

    /**
     * Filter per-route tambahan (selain yang didefinisikan langsung di Routes.php)
     */
    public array $filters = [];
}
