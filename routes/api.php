<?php

use App\Http\Controllers\AbandonedCheckoutController;
use App\Http\Controllers\AutomaticDiscountController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CheckoutTemplateController;
use App\Http\Controllers\CustomizationSettingsController;
use App\Http\Controllers\CustomScriptController;
use App\Http\Controllers\DefaultController;
use App\Http\Controllers\HandleStoreFrontController;
use App\Http\Controllers\LocalizationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PaymentMethodErrorController;
use App\Http\Controllers\PolicyPageController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ScriptIntegrationController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\ShippingFormController;
use App\Http\Controllers\ShopifyApiCallController;
use App\Http\Controllers\StoreWebhookController;
use App\Http\Controllers\SubdomainController;
use App\Http\Controllers\SubscriptionTemplateController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\TaxController;
use App\Http\Controllers\WebhookController;
use App\Http\Controllers\Customer\CustomerOrderController;
use App\Http\Controllers\Customer\PaymentDetailController;
use App\Http\Controllers\Customer\CustomerController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});




// customer api's
