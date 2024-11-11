<?php

use App\Http\Controllers\BaseController;
use App\Http\Controllers\DefaultController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SubdomainController;
use App\Http\Controllers\WebhookController;
use App\Models\SubscriptionTemplate;
use App\Models\User;
use Gnikyt\BasicShopifyAPI\BasicShopifyAPI;
use Gnikyt\BasicShopifyAPI\Options;
use Gnikyt\BasicShopifyAPI\Session;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Route;
use Omnipay\Omnipay;
use Spatie\Dns\Dns;
use Square\Environment;
use Square\SquareClient;
use Stripe\Charge;
use Stripe\Stripe;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/











Route::get('/', function () {
    return view('welcome');
});

Route::view('/{path?}', 'welcome')
    ->where('path', '.*')
    ->name('react');
