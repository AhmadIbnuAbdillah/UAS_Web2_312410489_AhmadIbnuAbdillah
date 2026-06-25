<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// =====================
// CORS Preflight Handler (OPTIONS)
// =====================
$routes->options('(:any)', static function () {
    $response = response();
    $response->setHeader('Access-Control-Allow-Origin', '*');
    $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
    $response->setStatusCode(200);
    return $response;
});

// =====================
// PUBLIC ROUTES (Tanpa Token)
// =====================
$routes->post('api/login', 'AuthController::login');
$routes->get('api/mobil/summary', 'MobilController::summary'); // ringkasan landing page

// GET semua data tetap bisa diakses publik untuk ditampilkan di halaman beranda
$routes->get('api/mobil', 'MobilController::index');
$routes->get('api/mobil/(:num)', 'MobilController::show/$1');
$routes->get('api/kategori', 'KategoriController::index');
$routes->get('api/kategori/(:num)', 'KategoriController::show/$1');
$routes->get('api/supplier', 'SupplierController::index');
$routes->get('api/supplier/(:num)', 'SupplierController::show/$1');

// =====================
// PROTECTED ROUTES (Wajib Bearer Token) - Filter 'auth'
// =====================
$routes->group('api', ['filter' => 'auth'], function ($routes) {
    $routes->post('logout', 'AuthController::logout');

    // Mobil - CUD (Create, Update, Delete)
    $routes->post('mobil', 'MobilController::create');
    $routes->put('mobil/(:num)', 'MobilController::update/$1');
    $routes->delete('mobil/(:num)', 'MobilController::delete/$1');
    $routes->post('upload', 'MobilController::upload');

    // Kategori - CUD
    $routes->post('kategori', 'KategoriController::create');
    $routes->put('kategori/(:num)', 'KategoriController::update/$1');
    $routes->delete('kategori/(:num)', 'KategoriController::delete/$1');

    // Supplier - CUD
    $routes->post('supplier', 'SupplierController::create');
    $routes->put('supplier/(:num)', 'SupplierController::update/$1');
    $routes->delete('supplier/(:num)', 'SupplierController::delete/$1');
});
