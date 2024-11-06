<?php

namespace App\Services;

use App\Models\PaymentMethod;
use App\Models\User;
use Omnipay\Omnipay;
use Ramsey\Uuid\Type\Time;
use Square\Environment;
use Square\SquareClient;
use Stripe\StripeClient;

class RefundService
{
    public function square_process($order,$amount)
    {
        $user = optional($order)->user;

//        dd($user);
        $payment = PaymentMethod::where('user_id', optional($user)->id)->where('variant','square')->first();
        if (!$payment || $payment->isEnabled != 1 || !optional($order)->authorization_id || !$user) {

//            return ["errors"=>true,"message"=>json_encode([!$payment , $payment->isEnabled != 1 , !optional($order)->authorization_id , !$user])];
            return ["errors"=>true,"message"=>"Payment details are either not found or not valid."];
//            return response(['errors' => true, 'message' => 'not found!'], 404);
        }
        $client = new SquareClient([
            'accessToken' => $payment->secretKey,
            'environment' => $payment->environment == 1 ? Environment::PRODUCTION : Environment::SANDBOX,
        ]);


        $amount_money = new \Square\Models\Money();
        $amount_money->setAmount($amount);
        $amount_money->setCurrency($user->currency);

        $body = new \Square\Models\RefundPaymentRequest('d7556724-fe1e-4af4-'.time(), $amount_money);
        $body->setPaymentId($order->authorization_id);
//        $body->setReason('no need');

//        dd($body);
        $api_response = $client->getRefundsApi()->refundPayment($body);

        if ($api_response->isSuccess()) {
            $result = $api_response->getResult();
            $resp = json_decode(json_encode($result));
            return ["errors"=>false,"id"=>$resp->refund->id,"status"=>$resp->refund->status ,"data"=>$resp ];
//            dd($resp);
        } else {
            $errors = $api_response->getErrors();
            $resp = json_decode(json_encode($errors));
//            dd($resp[0]->detail);
            if(isset($resp[0]->detail)){
                $message = $resp[0]->detail;
            }else{
                $message = "unknown error in api request";
            }
            return ["errors"=>true,"message"=>$message,"exception"=>$resp];
//            dd($errors);
        }
    }
    public function stripe_process($order,$amount){

        $user = optional($order)->user;

//        dd($user);
        $payment = PaymentMethod::where('user_id', optional($user)->id)->where('variant','stripe')->first();

        if (!$payment || $payment->isEnabled != 1  || !optional($order)->authorization_id || !$user) {
//            dd(!$payment,$order,$order->authorization_id,!$user);
            return ["errors"=>true,"message"=>"Payment details are either not found or not valid."];
//            return response(['errors' => true, 'message' => 'not found!'], 404);
        }


//        $stripe = new \Stripe\StripeClient('sk_test_51J9rfPHxRjzZrEl0PWA4U5mc6URh91J0svL8u3EsNYJYHB5YU6mwmvOumXLqv57p83XpffZCfH9AEgr6118Dzo1o00Auj31YFf');
//        $resp = $stripe->refunds->create([
//            'charge' => 'ch_1JClKMHxRjzZrEl0z302h1sR',
//            'amount'=>'200'
//        ]);
//
//        dd($resp);
//        $stripe = new \Stripe\StripeClient("sk_test_51J9rfPHxRjzZrEl0PWA4U5mc6URh91J0svL8u3EsNYJYHB5YU6mwmvOumXLqv57p83XpffZCfH9AEgr6118Dzo1o00Auj31YFf");
        $stripe = new \Stripe\StripeClient($payment->secretKey);


        $payment_id = $order->authorization_id;
//        $payment_id = 'pi_1JIYjvHxRjzZrEl0uHQizTtl';


        try {
            // Retrieve the payment object to get the charge ID
             $payment = $stripe->paymentIntents->retrieve($payment_id);

            // Get the charge ID from the payment object
            $charge_id = $payment->charges->data[0]->id;
//            dd($charge_id);
            // Create the refund
        $resp = $stripe->refunds->create([
            'charge' => $charge_id,
            'amount'=>$amount*100
        ]);

        return ["errors"=>false,"id"=>$resp->id,"status"=>$resp->status ,"data"=>$resp ];
//            echo "Refund successful:", $resp->id;
        } catch (\Stripe\Exception\ApiErrorException $e) {
//            $resp = json_decode(json_encode($errors));
//            dd($resp[0]->detail);

            return ["errors"=>true,"message"=>$e->getMessage(),"exception"=>$e];
//            echo 'Error:', $e->getMessage();
        }

//        $stripe->refunds->create([
//            'charge' => 'ch_17LZ4o2eZvKYlo2CgxuL86Qy',
//        ]);
    }


    public function paypal_process($order,$amount)
    {
        $user = optional($order)->user;

//        dd($user);
        $payment = PaymentMethod::where('user_id', optional($user)->id)->where('variant','paypal')->first();

        if (!$payment || $payment->isEnabled != 1 || !optional($order)->authorization_id || !$user) {
            return ["errors"=>true,"message"=>"Payment details are either not found or not valid."];
        }


        $accessToken = $this->createPaypalToken($payment);

        $resp = $this->paypalCaptureOrderDetail($payment,$order->authorization_id,$accessToken);
        if(!isset($resp->purchase_units[0]->payments->captures[0]->id)){
            return ["errors"=>true,"message"=>"Payment details are either not found or not valid."];
        }
        $capture_id = $resp->purchase_units[0]->payments->captures[0]->id;

        $post_request = [
                        "amount"=> [
                            "value"=> $amount,
                            "currency_code"=> $user->currency
                        ],
                        "invoice_id"=> now()->timestamp,
//                        "note_to_payer"=> "Defective product"
                        ];

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => ($payment->environment == 1 ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com') .'/v2/payments/captures/'.$capture_id.'/refund',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS =>json_encode($post_request),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                'PayPal-Request-Id: 95150b97-6936-498f-bb37-'.\time(),
                'Prefer: return=representation',
                'Authorization: Bearer '.$accessToken
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        $resp = json_decode($response);

        if(isset($resp->id)){
            return ["errors"=>false,"id"=>$resp->id,"status"=>$resp->status ,"data"=>$resp ];
        }else{
            if(isset($resp->message)){
                $message = $resp->message;
            }else{
                $message = "unknown error in api request";
            }
            return ["errors"=>true,"message"=>$message,"exception"=>$resp];

        }

    }


    public function authorize_process($order,$amount){


        $user = optional($order)->user;

//        dd($user);
        $payment = PaymentMethod::where('user_id', optional($user)->id)->where('variant','authorize')->first();

        if (!$payment || $payment->isEnabled != 1  || !optional($order)->authorization_id || !$user) {
            return ["errors"=>true,"message"=>"Payment details are either not found or not valid."];
        }

        $transactionReference = $order->authorization_id;

        $gateway = Omnipay::create('AuthorizeNetApi_Api');
        $gateway->setAuthName($payment->publicKey);
        $gateway->setTransactionKey($payment->secretKey);
        if ($payment->environment == 0) {
            $gateway->setTestMode(true); //comment this line when move to 'live'
        }


        $resp_trans = $gateway->fetchTransaction([
            'transactionReference' => $transactionReference,
        ])->send();

        if($resp_trans->isSuccessful()){
            $resp_trans = json_decode(json_encode($resp_trans->getData()));
//            dd($resp_trans->transaction->payment);
            if(!isset($resp_trans->transaction->payment->creditCard->cardNumber)){
                return ["errors"=>true,"message"=>'no payment found',"exception"=>[]];

            }
            $card_number = $resp_trans->transaction->payment->creditCard->cardNumber;
            $resp = $gateway->refund([
                'amount' => $amount,
                'currency' => $user->currency,
                'transactionReference' => $transactionReference,
                'numberLastFour' => $card_number,
             ])->send();
            if($resp->isSuccessful()){
                return ["errors"=>false,"id"=>$resp->getTransactionReference(),"status"=>"COMPLETED" ,"data"=>$resp->getData() ];
//                dd($resp->getData(),$resp->getTransactionReference(),$resp->getMessage());
            }else{
                return ["errors"=>true,"message"=>$resp->getMessage(),"exception"=>$resp->getData()];
            }
        }else{
            return ["errors"=>true,"message"=>$resp_trans->getMessage(),"exception"=>$resp_trans->getData()];
        }

    }

    public function paypalCaptureOrderDetail($payment,$id,$token){

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $payment->environment == 1 ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com' .'/v2/checkout/orders/'.$id,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
//            CURLOPT_POSTFIELDS =>json_encode($post_request),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                'PayPal-Request-Id: 95150b97-6936-498f-bb37-'.\time(),
                'Prefer: return=representation',
                'Authorization: Bearer '.$token
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return json_decode($response);
        dd($response);
    }

    public function createPaypalToken($request)
    {

        $api_key = $request->publicKey;
        $secret = $request->secretKey;

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $request->environment == 1 ? 'https://api-m.paypal.com/v1/oauth2/token' : 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => 'grant_type=client_credentials',
            CURLOPT_HTTPHEADER => array(
                'Authorization: Basic ' . base64_encode($api_key . ':' . $secret),
                'Content-Type: application/x-www-form-urlencoded'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

//        return $response;
        $resp = json_decode(($response));
//        dd($resp);
        return   $resp->access_token;
//        if(isset($resp->access_token)){
//
//            return ["error"=>false,"message"=>$resp->access_token];
//        }else{
//
//            return ["error"=>true,"message"=>json_encode($resp)];
//        }
    }


    public function takeService(){
        $shopUrl = 'yellowverandah.in';

// Get the last page number
        $lastPageNumber = $this->getLastPageNumber($shopUrl);
        echo "Last Page Number: {$lastPageNumber}\n";
    }

   public  function getLastPageNumber($shopUrl, $limit = 250) {
        $page = 1;
        $lastKnownPage = null;

        // Perform binary search to find the last page number
        while (true) {
            $url = "https://{$shopUrl}/collections/all/products.json?page={$page}&limit={$limit}";
            $response = json_decode(file_get_contents($url), true);

            if (empty($response['products'])) {
                // Empty products array indicates that the last page was found
                $lastKnownPage = $page - 1;
                break;
            } else {
                // Non-empty products array, so we continue searching
                $page *= 2;
            }
        }

        // If the lastKnownPage is null, there might be only one page of products
        return $lastKnownPage ?? 1;
    }


}