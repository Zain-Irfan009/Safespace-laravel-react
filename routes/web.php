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

Route::get('/not-allowed', function () {

    $cart = \App\Models\Cart::find(998);
    if ($cart->discount_title != '' || $cart->discount_title != 'null') {
        $discount_applied = [
            [
                "type" => 'fixed_amount',//$cart->discount_type, //"fixed_amount",//
                "code" => $cart->discount_title,
                "amount" => $cart->total_discount,
            ]
        ];
    } else {
        $discount_applied = [];
    }
    dd($discount_applied);

    $helper = new BaseController();
    $var = [
        "order" => [
            "line_items" => [
                [
                    "variant_id" => '45281088799003',
                    "quantity" => 1,

                ]
            ],
            "discount_codes" => [
                [
                    "amount" => "34",
                    "code" => "Cherry!",
                    "type" => "fixed"
                ]
            ]
        ]
    ];
    $resp = $helper->api('staging-checkout-republic.myshopify.com')->rest('POST', '/admin/orders', $var);
    dd($resp);
    $options = new Options();
    $options->setVersion('2020-01');

// Create the client and session
    $api = new BasicShopifyAPI($options);
    $api->setSession(new Session('luthersales-com.myshopify.com', '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'));
//        return $api->rest('GET','/admin/cart/1996242f8f5e91f3f1fa1f8d73f0a90a.json');
    $resp = $api->rest('GET', '/admin/webhooks.json');
    dd($resp);
    $a = $api->rest('DELETE', '/admin/webhooks/1075131646011.json');
    $b = $api->rest('DELETE', '/admin/webhooks/1075131678779.json');
//    $c = $api->rest('DELETE','/admin/webhooks/1075131809851.json');
//    $d = $api->rest('DELETE','/admin/webhooks/1075131842619.json');
    dd($a, $b, $resp);
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

Route::any('/test', function (\Illuminate\Http\Request $request) {

    $helper = new BaseController();


    $orderData = [
        "order" => [
            'line_items' => [
                [
                    'variant_id' => 46417001382171,
                    'quantity' => 1,
                    "fulfillment_status" => "unfulfilled",
                ],
//                [
//                    'title' => 'Payment Fee COD',
//                    'price' => 200,
//                    'quantity' => 1,
//                    "fulfillment_status" => "fulfilled",
//                    'image' => [
//                        'src' => 'https://cdn.shopify.com/s/files/1/0272/6982/4585/products/fees_160x160.png'
//                    ]
//                ]
            ],
            'customer' => [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john.doe@example.com'
            ],
            'transactions' => [
                [
                    'kind' => 'sale',
                    'status' => 'capture',
                    'amount' => '30.00',
//                    'currency' => 'USD',
                    'gateway' => 'Checkify Cash On Delivery',
                    'source_name' => 'web',
                    'authorization' => "asdasdasd-stripe-plus-paypal ",
                ]
            ],
            "location_id" => "86800236827",
            'fulfillments' => [[
                "location_id"=>86800236827,
                "shipment_status" => "ready_for_pickup"
            ]
            ],
            'fulfillment_status' => null,
            'financial_status' => 'paid',
            'total_price' => '10.00',
            'email' => 'john.doe@example.com',
            'send_receipt' => true
        ]
    ];
//    dd(json_encode($orderData));
    $resp = $helper->api('staging-checkout-republic.myshopify.com')->rest('POST', '/admin/api/2023-01/orders.json', $orderData);


//    $resp = $helper->api('staging-checkout-republic.myshopify.com')->rest('GET','/admin/api/2023-04/price_rules.json');
    dd($resp);
//    $payment = \App\Models\PaymentMethod::find(338);
    $client = new SquareClient([
        'accessToken' => 'EAAAEBzXCQ0Wzggd8rWurWMosImEzskGd2cOXEI4WNIaKg1-3K1DvNiIayc-nVty',
        'environment' => 1 ? Environment::PRODUCTION : Environment::SANDBOX,
    ]);

    $body = new \Square\Models\CompletePaymentRequest();

//    $api_response = $client->getPaymentsApi()->completePayment('tg9wknDlAd804pC5tYBP9Ku1oG9YY', $body);
    $api_response = $client->getPaymentsApi()->getPayment('tg9wknDlAd804pC5tYBP9Ku1oG9YY');

    if ($api_response->isSuccess()) {
        $result = $api_response->getResult();
        echo(json_encode($result));
    } else {
        $errors = $api_response->getErrors();
        dd($errors);
    }

    dd("stop");
    $service = new \App\Services\OrderService();
    $helper = new BaseController();
    $resp = $helper->api('staging-checkout-republic.myshopify.com')->rest('GET', '/admin/api/2022-10/orders/5457495589147.json');
    $resp = json_decode(json_encode($resp));
    $service->syncOrder($resp->body->order, User::find(70));
    dd($resp, "ok");
    $helper = new BaseController();
    $resp = $helper->api('staging-checkout-republic.myshopify.com')->rest('DELETE', '/admin/api/2022-10/webhooks/1354424058139.json', [
        "webhook" => [
            "address" => "https://app2.checkoutrepublic.com/api/webhooks/order-update",
            "topic" => "orders/fulfilled",
            "format" => "json"
        ]
    ]);

    dd("ok", $resp);

    $service = new \App\Services\RefundService();
    $resp = $service->takeService();
//    $resp = $service->authorize_process(\App\Models\Order::find(16),15);
    dd("pl", $resp);

//    $helper = new SubdomainController();
//    $helper->cloudwaysSupport();
//    $helper->cloudwaysDomainAdd();
//    $helper->cloudwaysSSLInstall();
//    dd($helper->domain_check('tlxapps.com'));
//    dd($helper->domain_check("tlxapps.com"));
//    $helper->addingDomainToCloudWays("tlx12.cloudways.com");
//    dd(":asd");
    $helper = new BaseController();

    $query = '
{
  order(id: "gid://shopify/Order/5442544435483") {
         fulfillmentOrders(first: 10) {
              nodes {
                assignedLocation {
                  name
                }
                lineItems(first: 40) {
                  nodes {
                    id
                    lineItem {
                        id
                    }
                  }
                }
              }
            }
            lineItems(first: 40) {
              nodes {
                id
                image {
                  src
                }
              }
            }
         }
      }

    ';


    $data = [
        "refund" =>
            [
                "currency" => "USD",
                "note" => (string)$request->input('note'),
                "notify" => (boolean)$request->input('notify'),
                "shipping" => [
//                    "full_refund" => true,
                    "amount" => "1"
                ],
                "refund_line_items" => [
                    [
                        "line_item_id" => 14085002330395,
                        "quantity" => 0,
                        "restock_type" => "no_restock"
                    ]
                ],
                "transactions" => [
                    [
                        "currency" => "USD",
                        "amount" => "1",
                        "gateway" => "square",
                        "parent_id" => "6626238955803",
                        "kind" => "refund"
                    ]
                ]
            ]
    ];

    $resp = $helper->api('staging-checkout-republic.myshopify.com')->rest('POST', '/admin/api/2023-07/orders/5444428235035/refunds.json', $data);
    dd(json_decode(json_encode($resp)));

    $resp = $helper->api('staging-checkout-republic.myshopify.com')->graph($query);
    $resp = json_decode(json_encode($resp));
    dd($resp);
    foreach ($resp->body->data->order->fulfillmentOrders->nodes as $items) {
        dump($items);
    }
    dd("sdf", $resp);

//    $ciphertext = 'U2FsdGVkX185DvSevwYQOecYaRo5x8urSpg1m1CQhGLlFmXLw7QvmbbD3sY6xapp';
//    $secretKey = 'aB3cD7eF8gH2iJ9kL1mN0oP5q75jjcdR6sT4uVXyZ';
//
//    $encryptedValue = $ciphertext; // This value was generated by the ReactJS script
////    $secretKey = $secretKey; // This should be the same key used in the ReactJS script
//    $decryptedValue = openssl_decrypt($encryptedValue, 'aes-256-cbc', $secretKey, OPENSSL_RAW_DATA, ''); // Decrypt the value
//    dd($decryptedValue); // Decrypted value
//
//// Decrypt the ciphertext using AES decryption
//    $plaintext = openssl_decrypt($ciphertext, 'aes-256-cbc', $secretKey, 0, substr($secretKey, 0, 16));
//    dd($plaintext);

//    $user = User::where('shopifyShopDomainName', $checkout->storeName)->first();


//    $merchantAuthentication = new \net\authorize\api\contract\v1\MerchantAuthenticationType();
//    $merchantAuthentication->setName('645VpWBk6C');
//    $merchantAuthentication->setTransactionKey('7cV3Pz69L7Fx3c2p');
//
//    $refId = 'ref' . time();
//    $cardNumber = preg_replace('/\s+/', '', '4111111111111111');
//
//
//    // Create the payment data for a credit card
//    $creditCard = new \net\authorize\api\contract\v1\CreditCardType();
//    $creditCard->setCardNumber('4111111111111111');
//    $creditCard->setExpirationDate('2045' . "-" .'12');
//    $creditCard->setCardCode('111');
//
//    // Add the payment data to a paymentType object
//    $paymentOne = new \net\authorize\api\contract\v1\PaymentType();
//    $paymentOne->setCreditCard($creditCard);
//
//    // Create a TransactionRequestType object and add the previous objects to it
//    $transactionRequestType = new net\authorize\api\contract\v1\TransactionRequestType();
//    $transactionRequestType->setTransactionType("authCaptureTransaction");
//    $transactionRequestType->setAmount('200');
//    $transactionRequestType->setPayment($paymentOne);
//
//
//    // Assemble the complete transaction request
//    $requests = new \net\authorize\api\contract\v1\CreateTransactionRequest();
//    $requests->setMerchantAuthentication($merchantAuthentication);
//    $requests->setRefId($refId);
//    $requests->setTransactionRequest($transactionRequestType);
//
//    // Create the controller and get the response
//    $controller = new \net\authorize\api\controller\CreateTransactionController($requests);
//    $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);
//
//    if ($response != null) {
//        // Check to see if the API request was successfully received and acted upon
//        if ($response->getMessages()->getResultCode() == "Ok") {
//            // Since the API request was successful, look for a transaction response
//            // and parse it to display the results of authorizing the card
//            $tresponse = $response->getTransactionResponse();
//
//            if ($tresponse != null && $tresponse->getMessages() != null) {
////                    echo " Successfully created transaction with Transaction ID: " . $tresponse->getTransId() . "\n";
////                    echo " Transaction Response Code: " . $tresponse->getResponseCode() . "\n";
////                    echo " Message Code: " . $tresponse->getMessages()[0]->getCode() . "\n";
////                    echo " Auth Code: " . $tresponse->getAuthCode() . "\n";
////                    echo " Description: " . $tresponse->getMessages()[0]->getDescription() . "\n";
//                $message_text = $tresponse->getMessages()[0]->getDescription().", Transaction ID: " . $tresponse->getTransId();
//                $msg_type = "success_msg";
//
//
//            } else {
//                $message_text = 'There were some issue with the payment. Please try again later.';
//                $msg_type = "error_msg";
//
//                if ($tresponse->getErrors() != null) {
//                    $message_text = $tresponse->getErrors()[0]->getErrorText();
//                    $msg_type = "error_msg";
//                }
//            }
//            // Or, print errors if the API request wasn't successful
//        } else {
//            $message_text = 'There were some issue with the payment. Please try again later.';
//            $msg_type = "error_msg";
//
//            $tresponse = $response->getTransactionResponse();
//
//            if ($tresponse != null && $tresponse->getErrors() != null) {
//                $message_text = $tresponse->getErrors()[0]->getErrorText();
//                $msg_type = "error_msg";
//            } else {
//                $message_text = $response->getMessages()->getMessage()[0]->getText();
//                $msg_type = "error_msg";
//            }
//        }
//    } else {
//        $message_text = "No response returned";
//        $msg_type = "error_msg";
//    }
//     dd($msg_type, $message_text);
//
//
//
//    dd("go");
//
    $gateway = Omnipay::create('AuthorizeNetApi_Api');
    $gateway->setAuthName('645VpWBk6C');
    $gateway->setTransactionKey('7cV3Pz69L7Fx3c2p');
    $gateway->setTestMode(true); //comment this line when move to 'live'


    $creditCard = new \Omnipay\Common\CreditCard([
        'number' => '4111111111111111',
        'expiryMonth' => '12',
        'expiryYear' => '2025',
        'cvv' => '111',
    ]);

    // Generate a unique merchant site transaction ID.
    $transactionId = rand(100000000, 999999999);

    $response = $gateway->authorize([
        'amount' => '200',
        'currency' => 'USD',
        'transactionId' => $transactionId,
        'card' => $creditCard,
    ])->send();

//            dd($response);
    if ($response->isSuccessful()) {

        // Captured from the authorization response.
        $transactionReference = $response->getTransactionReference();

        $response = $gateway->capture([
            'amount' => '200',
            'currency' => 'USD',
            'transactionReference' => $transactionReference,
        ])->send();

        dd($response);
        $transaction_id = $response->getTransactionReference();
        dd($transaction_id);
//        $amount = $checkout->oldTotalValue;

//        $transaction = CartOrderTransaction::updateOrCreate([
//            'checkout_id' => $checkout->id,
//            'source_id' =>$transaction_id,
//            'source_name' => $payment->variant,
//            'payment_method_id' => $payment->id
//        ], []);
//        return $this->checkout_store($checkout, $transaction);
        // Insert transaction data into the database

    }
    dd("er");

    $client = new Client();
    $headers = [
        'Content-Type' => 'application/x-www-form-urlencoded',
        'Accept' => 'application/json',
        'Authorization' => 'Bearer U7x2E5g5AnDvOCqztJGpDJU4E3EYDWKmA5NcQDWP',
        'Cookie' => 'SPSE=MBZOIh7DwEt3f9rp4SoFdNkpQFvSyoGh89YWbh1iyVaYN42Ig/EmkK1jv/FvgYTtjCFxgIWLK2HyId1WFvkLKg==; SPSI=87a16f7e65e94e6e3733e05311762cff; laravel_session=eyJpdiI6ImZ4Q0wzcUpmNnVUTmNPd0RDRkZNOGc9PSIsInZhbHVlIjoiQWc0QkgwV1BBU1hpajBoR1J5V2JOdWlCenhcLzk1Z1BFYk5jZVdHbzVQVkdaR2tlRzB0d2pHbmhYT0dJN0w4K2p2RlBUOVZVS2NRK0VPVEM2VGJPaVV3PT0iLCJtYWMiOiI0OTI2MWVjYzQ5NGMxOTJlMjEwZTE2YTkwNDViNjQzMTdjMjJhOWMwMjdjMDgyZmQ4NWYyYjRmZGUyNjg4NjM5In0%3D'
    ];
    $options = [
        'form_params' => [
            'server_id' => '908320',
            'app_id' => '3153127',
            'aliases[]' => 'tlxapps.com',
            'aliases[]' => '*.ecommercehack.com'
        ]];
    $request = new Request('POST', 'https://api.cloudways.com/api/v1/app/manage/aliases', $headers);
    $res = $client->sendAsync($request, $options)->wait();
    $resp = $res->getBody();
    dd($resp);
    dd("no");
    $helper = new SubdomainController();
    dd($helper->verifyDomain("https://tlxapps.com"));
//    $csv_headers = [];
//    $csv_items = [];
//    $filename = \Illuminate\Support\Facades\Storage::disk('custom-ftp')->get('/thinventory/thinv.csv');
//    \Illuminate\Support\Facades\Storage::disk('custom-public')->put('ftp.csv', $filename);
//    $filename = 'ftp.csv';
//
//    if (($handle = fopen(public_path($filename), 'r')) !== false) {
//        while (($row = fgetcsv($handle)) !== false) {
//            if (!$csv_headers)
//                $csv_headers = $row;
//            else
//                $csv_items[] = array_combine($csv_headers, $row);
//        }
//        fclose($handle);
//    }
//    dd($csv_items[10155]);
//    fclose($handle);

//    dd($filename);

//$code =    \App\Models\Country::select('code')->pluck('code')->toArray();
//    dd(json_encode($code),"go");


//dd($code);
//foreach ($code as $c=>$v){
//$cun =    \App\Models\Country::where('code',$c)->first();
//if($cun != null){
//    $cun->language_code = $v;
//    $cun->save();
//}
//}


//    dd("complere");
    $query = ' query nodes($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on Product {
      id
      collections(first: 10) {
      edges {
        node {
          id
        }
      }
    }
  }
}
}';
    $query1 = 'query nodes($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on PriceRule{
      id
      status
      usageCount
    }
  }
}
';
    $var = [];
    $line_items = \App\Models\AutomaticDiscount::whereNotNull('shopify_price_rule_id')->pluck('shopify_price_rule_id')->toArray();
    foreach ($line_items as $id) {
        array_push($var, 'gid://shopify/PriceRule/' . $id);
    }

    $variables = [
        "first" => 50,
        "last" => null,
        "after" => null,
        "before" => null,
        "reverse" => true,
        "sortKey" => "ID",
        "savedSearchId" => null,
        "query" => null
    ];

    $query2 = '
query {
  markets(first: 4) {
    edges {
      node {
        id
        name
      }
    }
  }
}


';
    $var2 = [
        "input" => [
            "enabled" => true,
            "name" => "ABC",
            "regions" => [
                [
                    "countryCode" => "PK"
                ]
            ]
        ]
    ];
    $helper = new  BaseController();
//    $script = ["script_tag" => ["event" => "onload", "src" => env('APP_URL') . '/script.js']];
//    $resp = $helper->api('checkify-pro.myshopify.com')->rest('POST', '/admin/api/2022-04/script_tags.json', $script);
//    $resp = $helper->api('tlx-dropshipping-app.myshopify.com')->graph($query,['ids'=>$var]);
//    $resp = $helper->api('tlx-dropshipping-app.myshopify.com')->graph($query1, ['ids'=>$var]);
    $resp = $helper->api('tlx-dropshipping-app.myshopify.com')->graph($query2, $var2);
    $respo = json_decode(json_encode($resp));
    dd($respo);
    $citems = [];
    foreach ($respo->body->data->nodes as $node) {
        $collections = [];
        if ($node != null) {
            if (count($node->collections->edges) > 0) {
                foreach ($node->collections->edges as $no) {
                    array_push($collections, str_replace('gid://shopify/Collection/', '', $no->node->id));
                }
            }
            array_push($citems, [
                str_replace('gid://shopify/Product/', '', $node->id) => $collections
            ]);
        }
    }
    foreach ($line_items as $it) {
        $it->collection = isset($citems[$it->product_id]) ? $citems[$it->product_id] : null;
    }
    dd($respo, $line_items);
    $items = [
        [
            'id' => '123',
            'quantity' => 23
        ],
        [
            'id' => '43981968539886',
            'quantity' => 10
        ],
        [
            'id' => '123',
            'quantity' => 23
        ]

    ];
    $line_items = [];
    if ($resp['errors'] == false) {
//        dd($resp['body']['data']['nodes']);
        foreach (json_decode(json_encode($resp['body']['data']['nodes']), true) as $index => $node) {

            if ($node != null) {
                $quantity = $items[$index]['quantity'];
//               dd($items[$index],$node);
                if ($node['availableForSale'] && $node['inventoryQuantity'] >= $quantity) {
                    array_push($line_items, [
                        'variant_id' => str_replace('gid://shopify/ProductVariant/', '', $node['id']),
                        'product_id' => str_replace('gid://shopify/Product/', '', $node['product']['id']),
                        'title' => $node['title'],
                        'vendor' => $node['product']['vendor'],
                        'sku' => $node['sku'],
                        'taxable' => $node['taxable'],
                        'price' => $node['price'],
                        'line_price' => $node['price'] * $quantity,
                        'original_line_price' => $node['price'] * $quantity,
                        'quantity' => $quantity,
                    ]);
                }
            }
        }
    }
//    dd($line_items,$resp, "go");

    $payment = \App\Models\PaymentMethod::find(62);
    try {

        Stripe::setApiKey($payment->secretKey);
        $resp = Charge::create([
            "amount" => 100 * 100,
            "currency" => 'USD',
            "source" => 'tok_1Mgml2H3Igfzz6r0i3FiQF4n',
            "description" => "Checkify Order Payment"
        ]);
        dd($resp->id);
    } catch (\Exception $x) {
//      $error =  json_decode(json_encode($x));
//        dd($error);
        dd($x->getMessage());
    }
    dd("test");
//    dd($request->file('video'));

//    $text = "";
//
//    $urdu =(explode("\n",$text));
//    $helper = new \App\Http\Controllers\LocalizationController();
//   $a = $helper->defaultLanguage();
////   dd(count($a));
//    $arr = [];
//    $i = 0;
//    foreach ($a as $index => $val){
//        $arr[$index] = $urdu[$i];
//        $i++;
////        echo "<br>".($val);
//    }
//    echo "<script>console.log(".json_encode($arr).")</script>";
//    dd($arr,"complete");
//   dd(explode('#',implode(' # ',$a)));
    $helper = new BaseController();
    $query = '
  mutation fileCreate($files: [FileCreateInput!]!) {
  fileCreate(files: $files) {

    userErrors {
      field
      message
    }
  }
}
  ';
    $var = [
        "files" => [
            [
//                "alt" => "VIDEO",
                "contentType" => "FILE",
//                "originalSource" => "https://cdn.shopify.com/videos/c/o/v/1abe12fd2b8247058e0584b337467559.mp4"
                "originalSource" => "https://v.ftcdn.net/03/05/02/59/700_F_305025903_o7DdBX4W9lhFehirPE054LUT81hMLPoz_ST.mp4"
            ]
        ]
    ];
    $resp = $helper->api('tlx-dropshipping-app.myshopify.com')->graph($query, $var);
    dd($resp);
//    $helper->api('tlx-dropshipping-app.myshopify.com')->rest('GET','/admin/api/2023-01/shipping_zones.json');
    dd("complete");
//$resp =    $helper->api('tlx-dropshipping-app.myshopify.com')->rest('GET','/admin/api/2023-01/shipping_zones.json');
    dd($resp);
    return $request->all();
    $options = new Options();
    $options->setVersion('2020-01');

// Create the client and session
    $api = new BasicShopifyAPI($options);
    $api->setSession(new Session('checkify-pro.myshopify.com', '1b0bb27a76f4f9a1fcccb64bf7766e34'));
//        return $api->rest('GET','/admin/cart/1996242f8f5e91f3f1fa1f8d73f0a90a.json');
    $resp = $api->graph(
        ' {
  cart(token: c247a3314c5365d9b5710e3a79e3516b) {
    id
    webUrl
    subtotalPrice
    totalTax
    totalPrice
    lineItems(first: 10) {
      edges {
        node {
          id
          title
          variant {
            id
            title
            price
            image {
              originalSrc
              altText
            }
          }
          quantity
        }
      }
    }
  }
}'
    );
    dd($resp);
});
Route::get('/markets', function () {

    $default = new \App\Http\Controllers\DefaultController();
    $country = [];
    $resp = $default->getActiveCountries('staging-checkout-republic.myshopify.com');
    dd("on", $resp);
    $options = new Options();
    $options->setVersion('2022-10');

    $query = '
query Markets {
  markets(first: 1) {
    edges {
      cursor
      node {
        enabled
        regions(first: 150) {
          nodes {
            ... on MarketRegionCountry {
              name
              code
            }
            name
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
';
// Create the client and session
//    $api = new BasicShopifyAPI($options);
//    $api->setSession(new Session('awake-water-referal-system.myshopify.com', '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'));
//    $api->setSession(new Session('awake-water-referal-system.myshopify.com', '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'));
//    $resp = $api->graph($query);
    $helper = new BaseController();
    $resp = $helper->api('staging-checkout-republic.myshopify.com')->graph($query);
    dd($resp);

});
try {
    $users = \App\Models\User::whereNotNull('domain')->get();
    foreach ($users as $user) {
//        Route::domain('{subdomain}.' . $user->domain)->group(function () {
////        Route::get('/', [SubdomainController::class, 'Noindex']);
//            Route::get('/checkout', [SubdomainController::class, 'index']);
////        Route::get('/{path?}', [SubdomainController::class, 'Noindex'])
////            ->where('path', '.*');
//        });
//Route::get('/domain',[SubdomainController::class,'index']);
//        Route::domain($user->domain)->group(function () {
////        abort(401);
//            Route::get('/', function () {
//                return view('welcome');
//            });
////        Route::get('/checkout', [SubdomainController::class, 'CheckoutDomainChecker']);
//            Route::view('/{path?}', 'welcome')
//                ->where('path', '.*')
//                ->name('react');
//        });
    }
} catch (\Exception $x) {
}
Route::get('electron',function (){
    $data = '{
	"zones": [
		{
			"name": "Alabama",
			"code": "AL"
		},
		{
			"name": "Alaska",
			"code": "AK"
		},
		{
			"name": "American Samoa",
			"code": "AS"
		},
		{
			"name": "Arizona",
			"code": "AZ"
		},
		{
			"name": "Arkansas",
			"code": "AR"
		},
		{
			"name": "California",
			"code": "CA"
		},
		{
			"name": "Colorado",
			"code": "CO"
		},
		{
			"name": "Connecticut",
			"code": "CT"
		},
		{
			"name": "Delaware",
			"code": "DE"
		},
		{
			"name": "Washington DC",
			"code": "DC"
		},
		{
			"name": "Micronesia",
			"code": "FM"
		},
		{
			"name": "Florida",
			"code": "FL"
		},
		{
			"name": "Georgia",
			"code": "GA"
		},
		{
			"name": "Guam",
			"code": "GU"
		},
		{
			"name": "Hawaii",
			"code": "HI"
		},
		{
			"name": "Idaho",
			"code": "ID"
		},
		{
			"name": "Illinois",
			"code": "IL"
		},
		{
			"name": "Indiana",
			"code": "IN"
		},
		{
			"name": "Iowa",
			"code": "IA"
		},
		{
			"name": "Kansas",
			"code": "KS"
		},
		{
			"name": "Kentucky",
			"code": "KY"
		},
		{
			"name": "Louisiana",
			"code": "LA"
		},
		{
			"name": "Maine",
			"code": "ME"
		},
		{
			"name": "Marshall Islands",
			"code": "MH"
		},
		{
			"name": "Maryland",
			"code": "MD"
		},
		{
			"name": "Massachusetts",
			"code": "MA"
		},
		{
			"name": "Michigan",
			"code": "MI"
		},
		{
			"name": "Minnesota",
			"code": "MN"
		},
		{
			"name": "Mississippi",
			"code": "MS"
		},
		{
			"name": "Missouri",
			"code": "MO"
		},
		{
			"name": "Montana",
			"code": "MT"
		},
		{
			"name": "Nebraska",
			"code": "NE"
		},
		{
			"name": "Nevada",
			"code": "NV"
		},
		{
			"name": "New Hampshire",
			"code": "NH"
		},
		{
			"name": "New Jersey",
			"code": "NJ"
		},
		{
			"name": "New Mexico",
			"code": "NM"
		},
		{
			"name": "New York",
			"code": "NY"
		},
		{
			"name": "North Carolina",
			"code": "NC"
		},
		{
			"name": "North Dakota",
			"code": "ND"
		},
		{
			"name": "Northern Mariana Islands",
			"code": "MP"
		},
		{
			"name": "Ohio",
			"code": "OH"
		},
		{
			"name": "Oklahoma",
			"code": "OK"
		},
		{
			"name": "Oregon",
			"code": "OR"
		},
		{
			"name": "Palau",
			"code": "PW"
		},
		{
			"name": "Pennsylvania",
			"code": "PA"
		},
		{
			"name": "Puerto Rico",
			"code": "PR"
		},
		{
			"name": "Rhode Island",
			"code": "RI"
		},
		{
			"name": "South Carolina",
			"code": "SC"
		},
		{
			"name": "South Dakota",
			"code": "SD"
		},
		{
			"name": "Tennessee",
			"code": "TN"
		},
		{
			"name": "Texas",
			"code": "TX"
		},
		{
			"name": "Utah",
			"code": "UT"
		},
		{
			"name": "Vermont",
			"code": "VT"
		},
		{
			"name": "U.S. Virgin Islands",
			"code": "VI"
		},
		{
			"name": "Virginia",
			"code": "VA"
		},
		{
			"name": "Washington",
			"code": "WA"
		},
		{
			"name": "West Virginia",
			"code": "WV"
		},
		{
			"name": "Wisconsin",
			"code": "WI"
		},
		{
			"name": "Wyoming",
			"code": "WY"
		},
		{
			"name": "Armed Forces Americas",
			"code": "AA"
		},
		{
			"name": "Armed Forces Europe",
			"code": "AE"
		},
		{
			"name": "Armed Forces Pacific",
			"code": "AP"
		}
	]
}';
    $data = json_decode($data);
//    dd($data->zones);
    \App\Models\State::where('country_id',231)->delete();
    foreach ($data->zones as $state){
//        dd($state->name);
        $stated = new \App\Models\State();
        $stated->name = $state->name;
        $stated->country_id = 231;
        $stated->save();
//        \App\Models\State::updateOrCreate([
//            'name'=>$state->name,
//            'country_id'=>231
//        ],[]);
    }
    dd("complete");
});
Route::get('/grone', function () {
    $helper = new BaseController();

    $users = User::whereNotNull('shopifyShopDomainName')->get();
//    dd($users);
    foreach ($users as $index => $user) {
        $shop = $user->shopifyShopDomainName;

//    $shop = 'living-nutritionals.myshopify.com';
        $oldScript = '<script data-checkout-republic-url="https://app.checkoutrepublic.com" async="" src="https://app.checkoutrepublic.com/script.js"></script>';

        $main_theme = $helper->api($shop)->rest('GET', '/admin/themes', [
            'role' => 'main'
        ]);
        $theme_resp = json_decode(json_encode($main_theme));

        if(!isset($theme_resp->body->themes[0]->id)){
            dump($shop);
            continue;
        }
        $id_theme = $theme_resp->body->themes[0]->id;


        $asset_theme = $helper->api($shop)->rest('GET', '/admin/api/2023-01/themes/' . $id_theme . '/assets.json', [
            "asset" => [
                "key" => "layout/theme.liquid"
            ]
        ]);

        $asset = json_decode(json_encode($asset_theme));
        if ($asset->errors) {
            dump($shop,$asset);
            continue;
//            dd($asset);
//        return response()->json(['errors'=>true,'message'=>'theme.liquid not found'],404);
        }
        $values = $asset->body->asset->value;
        $script = '<script data-checkout-republic-url="' . env('APP_URLA') . '" async="" src="' . env('APP_URLA') . '/script.js"></script>';

        if (strpos($values, $oldScript) !== false) {
            $new_value = str_replace($oldScript, $script, $values);
//        dd($values,$new_value);
            $resp = $helper->api($shop)->rest('PUT', '/admin/api/2023-01/themes/' . $id_theme . '/assets.json', [
                "asset" => [
                    "key" => "layout/theme.liquid",
                    "value" => $new_value
                ]
            ]);
//            dump($index);
//            dump($shop,$resp);
//            dd($resp);
        }
    }
    //    $helper->api('')->rest('');
    dd("stop");
    $tax_line = [
        [
            "price" => "100",
            "rate" => "16",
            "title" => "Tax"
        ]
    ];
    $orderData = [
        "order" => [
            'line_items' => [
                [
                    'variant_id' => 44532623769873,
                    'quantity' => 1
                ],
//                [
//                    'title' => 'Payment Fee COD',
//                    'price' => 200,
//                    'quantity' => 1,
//                    "fulfillment_status" => "fulfilled",
//                    'image' => [
//                        'src' => 'https://cdn.shopify.com/s/files/1/0272/6982/4585/products/fees_160x160.png'
//                    ]
//                ]
            ],
            'customer' => [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john.doe@example.com'
            ],
            'transactions' => [
                [
                    'kind' => 'capture',
                    'status' => 'success',
                    'amount' => '30.00',
//                    'currency' => 'USD',
                    'gateway' => 'Checkify Cash On Delivery',
                    'source_name' => 'web',
                    'authorization' => "asdasdasd-stripe-plus-paypal",
                ]
            ],
            'financial_status' => 'paid',
            'total_price' => '10.00',
            'email' => 'john.doe@example.com',
            'tax_lines'=>$tax_line,
            'taxes_included'=>true,
            'send_receipt' => true
        ]
    ];
//    dd(json_encode($orderData));
    $resp = $helper->api('checkify-pro.myshopify.com')->rest('POST', '/admin/api/2023-01/orders.json', $orderData);
//$resp =    $helper->api('tlx-dropshipping-app.myshopify.com')->rest('GET','/admin/api/2023-01/shipping_zones.json');
    dd($resp);
//    $helper = new  SubdomainController();
//    $helper->addingDomainToCloudWays('tlxapps.com');
});
Route::get('wtf', function () {
    $helper = new \App\Http\Controllers\CheckoutController();
    $trans = \App\Models\CartOrderTransaction::find(556);
    $helper->capture_payment_paypal_manual($trans);
});

Route::get('/groner', function () {

//    $sc = \App\Models\SubscribedCustomer::find(1);
//    dd($sc->line_item->subscription_discount);
//    dd("no");
    $discount = new \App\Services\SubscriptionService();
//    $discount->subscriptionCronjob();
    $discount->subscriptionCall(\App\Models\SubscribedCustomer::find(4));
    dd("ok");
//    $resp = $discount->subscriptionCall(\App\Models\SubscribedCustomer::find(1));
//    $resp =$discount->apply_discount(json_decode(json_encode(["has_discount"=>"g10","subscription_id"=>2])));
    dd("p", $resp);
    $helper = new BaseController();

    $query = '
mutation discountCodeBasicUpdate($basicCodeDiscount: DiscountCodeBasicInput!, $id: ID!) {
  discountCodeBasicUpdate(basicCodeDiscount: $basicCodeDiscount, id: $id) {
    codeDiscountNode {
     id
    }
    userErrors {
      field
      message
    }
  }
}

    ';
    $var = '{
  "basicCodeDiscount": {
    "appliesOncePerCustomer": true,
    "code": "mango",
    "combinesWith": {
      "orderDiscounts": true,
      "productDiscounts": true,
      "shippingDiscounts": true
    },
    "customerGets": {
      "appliesOnOneTimePurchase": false,
      "appliesOnSubscription": true,
      "items": {
        "all": true

      },
      "value": {
        "discountAmount": {
          "amount": "23",
          "appliesOnEachItem": true
        },
        "discountOnQuantity": {
          "effect": {
            "percentage": 1.1
          },
          "quantity": "12"
        },
        "percentage": 1.1
      }
    },
    "customerSelection": {
      "all": true

    },

    "recurringCycleLimit": 1,
    "title": "okok",
    "usageLimit": 1
  },
  "id": "gid://shopify/DiscountCodeNode/1414174736667"
    }
';

    $resp = $helper->api('staging-checkout-republic.myshopify.com')->graph($query, json_decode($var, true));
    dd($resp);
//
//    $service = new \App\Services\SubscriptionService();
//    $service->subscriptionCall(\App\Models\SubscribedCustomer::find(1));

    $helper = new DefaultController();
    $helper->syncAllShopesShippingCountries();

    dd("ok");
    $l_query = '{
  locations(first: 250) {
    nodes {
      address {
        address1
        city
        country
        zip
        provinceCode
        province
      }
      localPickupSettingsV2 {
        instructions
        pickupTime
      }
      name
      id
    }
  }
}
';
    $query = 'mutation draftOrderCalculate($input: DraftOrderInput!) {
  draftOrderCalculate(input: $input) {
    userErrors {
      field
      message
    }
    calculatedDraftOrder {
      appliedDiscount {
        title
        value
        valueType
        description
        amountV2 {
          amount
          currencyCode
        }
      }
      totalTaxSet {
        presentmentMoney {
          amount
          currencyCode
        }
      }
      totalTax
      totalShippingPrice
      totalPrice
      totalDiscountsSet {
        presentmentMoney {
          amount
          currencyCode
        }
      }
      subtotalPrice
      customer {
        id
      }
      billingAddressMatchesShippingAddress
      availableShippingRates {
        handle
        price {
          amount
          currencyCode
        }
        title
      }
      currencyCode
      lineItems {
        sku
        quantity
        variantTitle
        vendor
        variant {
          inventoryItem {
            inventoryLevels(first: 10) {
              nodes {
                location {
                  id
                  name
                  localPickupSettingsV2 {
                    instructions
                    pickupTime
                  }
                  isPrimary
                  isActive
                  hasActiveInventory
                   address {
                    address1
                    address2
                    city
                    country
                    zip
                    provinceCode
                    province
                    countryCode
                  }
                }
                available
              }
            }
          }
        }
      }
      shippingLine {
        code
      }
    }
  }
}
';
    $var = [
        "input" => [


            "appliedDiscount" => [
                "amount" => "12",
                "description" => "",
                "title" => "qwerty1223",
                "value" => 1.1,
                "valueType" => "FIXED_AMOUNT"
            ],

            "shippingAddress" => [
                "address1" => "123 Amoebobacterieae St",
                "address2" => "",
                "city" => "Lahore",
                "company" => "",
                "countryCode" => "US",
                "firstName" => "Bob",
                "lastName" => "Bobsen",
                "phone" => "",
                "province" => "Alaska",
//                  "provinceCode"=> "AK1",
                "zip" => "99502"
            ],
            "lineItems" => [
                [
                    "quantity" => 1,
                    "requiresShipping" => true,
                    "taxable" => true,
                    "variantId" => "gid://shopify/ProductVariant/45604738498843",

                ],
//                [
//                    "quantity"=> 2,
//                    "requiresShipping"=> true,
//                    "taxable"=> true,
//                    "variantId"=> "gid://shopify/ProductVariant/45281088799003",
//
//                ]
            ],
        ]
    ];
    $helper = new BaseController();

    $resp = $helper->api('staging-checkout-republic.myshopify.com')->graph($query, $var);
    $l_resp = $helper->api('staging-checkout-republic.myshopify.com')->graph($l_query);
    $lresp = json_decode(json_encode($l_resp));
    $total_locations = [];
    foreach ($lresp->body->data->locations->nodes as $locat) {
        if ($locat->localPickupSettingsV2 != null) {
            array_push($total_locations, [
                "id" => $locat->id,
                "name" => $locat->name
            ]);
        }
    }
//  dd($total_locations);
    $resp = json_decode(json_encode($resp));
    if ($resp->errors != false) {
        dd($resp);
    }
    $inventory_levels = [];
    foreach ($resp->body->data->draftOrderCalculate->calculatedDraftOrder->lineItems as $q_index => $line) {
        $quantity = $line->quantity;

        if (isset($line->variant->inventoryItem->inventoryLevels)) {
            foreach ($line->variant->inventoryItem->inventoryLevels->nodes as $inventory_level) {
                if ($inventory_level->available >= $quantity) {
//                dd($inventory_level->locaion);
                    if (isset($inventory_level->location->localPickupSettingsV2->pickupTime) &&
                        $inventory_level->location->isActive &&
                        $inventory_level->location->hasActiveInventory
                    ) {
                        $location = $inventory_level->location;
                        $address = json_decode(json_encode($location->address), true);


                        array_push($inventory_levels, [
                            "index" => $q_index,
                            "id" => $location->id,
                            "name" => $location->name,
                            "address" => $address,
                            "instructions" => $location->localPickupSettingsV2->instructions,
                            "pickupTime" => $location->localPickupSettingsV2->pickupTime,
                            "isPrimary" => $location->isPrimary
                        ]);
                    }
                }
            }
        }

//      if(in_array(""))

    }
    $pick_up = false;
    if (count($inventory_levels) > 0 && count($var["input"]["lineItems"]) == 1) {
        $pick_up = true;
    }
    if (count($inventory_levels) > 0 && count($var["input"]["lineItems"]) > 1) {
        $pick_up = true;
    }

    $unique_location = collect($inventory_levels)->groupBy('id')->toArray();
    $filter_locations = [];
    foreach ($unique_location as $index => $value) {
        if (count($value) == count($var["input"]["lineItems"])) {
            array_push($filter_locations, $value[0]);
        }
    }


    usort($filter_locations, function ($item1, $item2) {
        $isPrimary1 = $item1['isPrimary'];
        $isPrimary2 = $item2['isPrimary'];

        if ($isPrimary1 && !$isPrimary2) {
            return -1; // $item1 comes before $item2
        } elseif (!$isPrimary1 && $isPrimary2) {
            return 1; // $item1 comes after $item2
        } else {
            return 0; // No change in order
        }
    });
    dd(collect($filter_locations)->first());
    foreach ($total_locations as $i_l) {
        foreach ($line_items as $items) {
            foreach ($items as $item) {
                if ($item["id"] == $i_l["id"]) {
                    array_push($unique_location, $i_l);
                }
            }
        }
    }
    dd($unique_location, $line_items, $inventory_levels, $resp);
//    $helper = new  SubdomainController();
//    $helper->addingDomainToCloudWays('tlxapps.com');
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