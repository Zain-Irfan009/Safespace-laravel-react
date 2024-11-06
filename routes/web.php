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
Route::get('/nanto-haseeb', function () {
    $options = new Options();
    $options->setVersion('2020-01');

// Create the client and session
    $api = new BasicShopifyAPI($options);
    $api->setSession(new Session('speed-booster-testing.myshopify.com', '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'));
//        return $api->rest('GET','/admin/cart/1996242f8f5e91f3f1fa1f8d73f0a90a.json');
    $resp = $api->rest('GET', '/admin/webhooks.json');
    dd($resp);
});



Route::get('/custom-script.js', function () {
//    dd('yes');
    $html = view('customize-script');
    return response($html)
        ->header('Content-Type', 'text/javascript');
});


Route::get('/script.js', function () {
//    dd('yes');
    $html = view('script');
    return response($html)
        ->header('Content-Type', 'text/javascript');
});

Route::get('cart-create', [WebhookController::class, 'cart_webhook']);

Route::get('/file-upload', function () {
    return view('file');
});




Route::domain('{subdomain}.' . 'checkoutrepublic.com')->group(function () {
    Route::get('/checkout', [SubdomainController::class, 'index']);
    Route::get('/thank-you-page', [SubdomainController::class, 'index_thankyou']);
});
Route::get('/', function () {
    return view('welcome');
});
Route::get('/checkout', [SubdomainController::class, 'CheckoutDomainChecker']);
Route::get('/thank-you-page', [SubdomainController::class, 'CheckoutDomainChecker']);
//Route::view('/{path?}', 'welcome')
//    ->where('path', '.*')
//    ->name('react');
