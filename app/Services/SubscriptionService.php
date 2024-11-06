<?php

namespace App\Services;

use App\Http\Controllers\BaseController;
use App\Models\AutomaticDiscount;
use App\Models\Cart;
use App\Models\CartOrderTransaction;
use App\Models\Checkout;
use App\Models\Country;
use App\Models\CustomerDiscountApplied;
use App\Models\CustomizationPaidOption;
use App\Models\DiscountCodeLog;
use App\Models\Order;
use App\Models\OrderLineItem;
use App\Models\PaymentMethod;
use App\Models\State;
use App\Models\SubscribedCustomer;
use App\Models\SubscriptionOrderLog;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Square\Environment;
use Square\Exceptions\ApiException;
use Square\SquareClient;

class SubscriptionService extends BaseController
{

    public function subscriptionCronjob()
    {
        $subs = SubscribedCustomer::where('is_enable', 1)->withCount('order_log')->get();
        foreach ($subs as $s) {
            $today = now();
            $subscription_call_day = Carbon::parse($s->next_call_at);
            if ($today->greaterThan($subscription_call_day)) {
                $sp = json_decode($s->subscription_payload);
                if ($sp->max_subs == "NO_LIMIT") {
                    $this->subscriptionCall($s);
                } else {
                    if ($sp->max_subs != "NO_LIMIT" && $s->order_log < $sp->max_subs_amount) {
                        $this->subscriptionCall($s);
                    } else {
                        $s->status = "Completed";
                        $s->save();
                    }
                }
            }
        }
    }

    public function subscriptionCall($sub)
    {
        $checkout = $sub->checkout;
        $line_item = $sub->line_item;
        $subtotal = optional($line_item)->original_line_price;
        $sub_discount = optional($line_item)->subscription_line_discount;
        $tax = $checkout->oldTaxValue;
        $shipping = $checkout->oldShippingValue;
        $discount_title = "Subscription Discount";

        if ($checkout->oldDiscountCode != null) {
            $check_discount = $this->apply_discount(json_decode(json_encode(
                [
                    "has_discount" => $checkout->oldDiscountCode,
                    "subscription_id" => $sub->id,
                    "customer_id" => $sub->customer_id
                ]
            )));
            if ($check_discount['error'] == 'false') {
                $discount_title = $discount_title . " + " . $checkout->oldDiscountCode;
                $totalDiscount = $sub_discount + $check_discount['discount_value'];
            } else {
                $totalDiscount = $sub_discount;
            }
        } else {
            $totalDiscount = $sub_discount;
        }

//        $calc = $this->orderCalculation($sub,$shipping,$totalDiscount);
        $calc = $this->orderCalculation($sub);

        if($calc['errors'] == true){
            $sub->status = "Cancel";
            $sub->cancel_response = $calc["message"];
            $sub->save();
            return 1;
        }


        $total = $subtotal + $tax + $shipping - $totalDiscount;

        if ($calc["errors"] == false) {
            $total = $calc["SubTotalValue"] + $calc["TotalTax"] + $shipping - $totalDiscount;
            $calculation = [
                "SubTotalValue" => $calc["SubTotalValue"],
                "TotalValue" => $total,
                "TotalTax" => $calc["TotalTax"],
                "TotalDiscount" => $totalDiscount,
                "DiscountCode" => $discount_title
            ];
        } else {
            $calculation = [
                "SubTotalValue" => $subtotal,
                "TotalValue" => $total,
                "TotalTax" => $tax,
                "TotalDiscount" => $totalDiscount,
                "DiscountCode" => $discount_title
            ];
        }
//      dd($calculation);
        $calculation = json_decode(json_encode($calculation));
        $resp_payment = $this->squarePaymentProcess($sub, $calculation);

//       dd($resp_payment);
        if ($resp_payment["errors"] == false) {
            $resp_order = $this->createOrderProcess($sub, $resp_payment["transaction"], $calculation);
            if ($resp_order["errors"] == false) {
                $sub->next_call_at = $this->calculateFutureDate($sub->interval);
                $sub->recent_call_at = now();
            } else {
                $sub->status = "Cancel";
                $sub->cancel_response = $resp_order["message"];
            }
        } else {
            $sub->status = "Cancel";
            $sub->cancel_response = $resp_payment["message"];
        }
        $sub->save();
    }

    public function squarePaymentProcess($sub, $calculation)
    {
        $user = $sub->user;
        $payment = $sub->payment;
//        dd($calculation->TotalValue);
        $client = new SquareClient([
            'accessToken' => $payment->secretKey,
            'environment' => $payment->environment == 1 ? Environment::PRODUCTION : Environment::SANDBOX,
        ]);

        try {
            $amount_money = new \Square\Models\Money();
            $amount_money->setAmount($calculation->TotalValue * 100);
            $amount_money->setCurrency($user->currency);

            $square_customer_id = $sub->payment_method_customer_id;
            $square_card_id = $sub->payment_method_card_id;

            $body = new \Square\Models\CreatePaymentRequest(
                $square_card_id,
                '99ee0861-4e08-44ed-987a-' . time(),
                $amount_money
            );
//                $body->setAmountMoney($amount_money);
            $body->setCustomerId($square_customer_id);

            $body->setLocationId($payment->publicKey);

            $api_response = $client->getPaymentsApi()->createPayment($body);


            if ($api_response->isSuccess()) {
                $result = $api_response->getResult();
                $result = json_decode(json_encode($result));
                $transaction = CartOrderTransaction::updateOrCreate([
//                    'checkout_id' => $checkout->id,
                    'source_id' => $result->payment->id,
                    'source_name' => $payment->variant,
                    'payment_method_id' => $payment->id
                ], []);
                return ["errors" => false, "transaction" => $transaction];
            } else {
                return ["errors" => true, "message" => json_encode($api_response->getErrors())];
            }

        } catch (ApiException $e) {
            return ['errors' => true, 'message' => $e->getMessage()];
        }


    }

    public function orderCalculation($sub,$shp_val=0,$dis_val=0)
    {

        $checkout = $sub->checkout;

        $ch_shipping_form = json_decode($checkout->oldShippingFormDetails);
        $ch_billing_form = json_decode($checkout->oldBillingFormDetails);
        $email = optional($ch_shipping_form)->email;


        $country_selected = Country::find(optional($ch_shipping_form)->country);
        $state_selected = State::find(optional($ch_shipping_form)->state);
        $country_selected_b = Country::find(optional($ch_billing_form)->country);
        $state_selected_b = State::find(optional($ch_billing_form)->state);


        if($shp_val > 0) {
            $ch_shipping_line = [
                "price" => $shp_val,//$checkout->oldShippingValue,
                "shippingRateHandle" => "sdfdsf",
                "title" => "asdasd"
            ];
        }else{
            $ch_shipping_line = [];
        }


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
                    variantTitle
                    vendor
                    requiresShipping
                  }
                  shippingLine {
                    code
                  }
                }
              }
            }';


        $line_items = [];
        array_push($line_items, [
            "variantId" => "gid://shopify/ProductVariant/" . $sub->product_variant_id,
            "quantity" => (int)$sub->quantity,
        ]);

        $var = [
            "input" => [
//                "appliedDiscount"=> [
//                    "amount"=> "12",
//                    "description"=> "",
//                    "title"=> "qwerty1223",
//                    "value"=> 1.1,
//                    "valueType"=> "FIXED_AMOUNT"
//                ],
//                "shippingLine"=> $ch_shipping_line,
                "shippingAddress" => [
                    "city" => optional($ch_shipping_form)->city,
                    "firstName" => optional($ch_shipping_form)->firstName,
                    "lastName" => optional($ch_shipping_form)->lastName,
                    "province" => optional($state_selected)->name,//optional($ch_shipping_form)->stateName,
                    "country" => optional($country_selected)->name,//optional($ch_shipping_form)->countryName,
                    "zip" => optional($ch_shipping_form)->zipCode,
                    "phone" => optional($ch_shipping_form)->phone,
//                    "name" => optional($ch_shipping_form)->firstName . ' ' . optional($ch_shipping_form)->lastName,
                    "address1" => optional($ch_shipping_form)->address,

                ],
                "lineItems" => $line_items,
            ]
        ];
        if(isset($ch_shipping_line['title'])){
            $var["input"]["shippingLine"] = $ch_shipping_line;
        }
        if($dis_val > 0){
            $var["input"]["appliedDiscount"] = [
                "amount"=> (float)$dis_val,
                "description"=> "",
                "title"=> "Custom",
                "value"=> (float)$dis_val,
                "valueType"=> "FIXED_AMOUNT"
            ];
        }
        $resp = $this->api($checkout->storeName)->graph($query, $var);
        $resp = json_decode(json_encode($resp));
//        dd($resp);
        if ($resp->errors == false) {
            $data = $resp->body->data->draftOrderCalculate->calculatedDraftOrder;

            return ["errors" => false, "TotalValue" => $data->totalPrice, "SubTotalValue" => $data->subtotalPrice, "TotalTax" => $data->totalTax];
        }

        return ["errors" => true,"message"=> "failed to calculate on shopify"];

    }


    public function apply_discount($request)
    {
        $subscription = SubscribedCustomer::where('id', $request->subscription_id)->withCount('order_log')->first();


        if ($subscription == null) {
            return ([
                'invoice_url' => 'Subscription not found!',
                'error' => 'true'
            ]);
        }

        $checkout = $subscription->checkout;

        $shop = User::where('shopifyShopDomainName', $checkout->storeName)->first();

        $ch_shipping_form = json_decode($checkout->oldShippingFormDetails);
        $ch_billing_form = json_decode($checkout->oldBillingFormDetails);
        $email = optional($ch_shipping_form)->email;

        $cart_data = Cart::where('checkout_id', $checkout->id)->first();

        $discount_type = "";
        $cart_discount_amount = 0;
        $subscription_total = $subscription->line_items()->sum('original_line_price') - $subscription->subscription_discount;
//        $cart_data = json_decode($request->cart_data);
//        dd($cart_data);
//        return($cart_data->items);
//        return $checkout->storeName;
//       return ($this->price_rule_get_array($checkout,null,[],$request));
        $discount_code = $this->api($checkout->storeName)->rest('GET', '/admin/api/2023-04/discount_codes/lookup.json',
            [

//                'status'=>'active',
                'code' => $request->has_discount
//                'page_info'=> $request->link??null
            ]);
        $discount_code = json_decode(json_encode($discount_code));
        if (!$discount_code->errors) {
            $price_rule_id = $discount_code->body->discount_code->price_rule_id;
        } else {
            $price_rule_id = null;
            return ([
                'invoice_url' => 'Invalid Discount Code',
                'error' => 'true'
            ]);
        }
//        return response()->json($discount_code);
        $query = 'query MyQuery { priceRule(id: "' . "gid://shopify/PriceRule/" . $price_rule_id . '") {
    id
    status
    usageCount
    startsAt
    endsAt
    allocationLimit
    allocationMethod
    usageLimit
    validityPeriod {
      end
      start
    }
    value {
      ... on PriceRuleFixedAmountValue {
        __typename
        amount
      }
      ... on PriceRulePercentValue {
        __typename
        percentage
      }
    }
    features
    summary
    target
    prerequisiteSubtotalRange {
      greaterThan
      greaterThanOrEqualTo
      lessThan
      lessThanOrEqualTo
    }
    oncePerCustomer
    shippingEntitlements {
      countryCodes
      includeRestOfWorld
      targetAllShippingLines
    }
    shareableUrls {
      title
      targetType
      url
    }
    prerequisiteToEntitlementQuantityRatio {
      entitlementQuantity
      prerequisiteQuantity
    }
    combinesWith {
      orderDiscounts
      productDiscounts
      shippingDiscounts
    }
    createdAt
    customerSelection {
      forAllCustomers
      segments {
        id
      }
    }
    discountClass
    discountCodesCount
    entitlementToPrerequisiteQuantityRatio {
      entitlementQuantity
      prerequisiteQuantity
    }
    hasTimelineComment
  }
}
';
        $sub_query = '
        query MyQuery {
        codeDiscountNodeByCode(code: "' . $request->has_discount . '") {
    codeDiscount {
      ... on DiscountCodeBasic {
        endsAt
        customerGets {
          appliesOnSubscription
          appliesOnOneTimePurchase
        }
        asyncUsageCount
        appliesOncePerCustomer
        recurringCycleLimit
        usageLimit
      }
    }
  }
}
';
        $gl_price_rule = $this->api($checkout->storeName)->graph($query);
        $db_discount = AutomaticDiscount::where('user_id', $shop->id)->where('code', $request->has_discount)->first();
//        $gl_subscription = $this->api($checkout->storeName)->graph($sub_query);
//        $gl_subscription = json_decode(json_encode($gl_subscription));
        $gl_price_rule = json_decode(json_encode($gl_price_rule));
        $price_rules = $this->api($checkout->storeName)->rest('GET', '/admin/price_rules/' . $price_rule_id . '.json',
            [
//                "ids"=>$price_rule_id,
//                'status'=>'active',
                'limit' => 250,
//                'page_info'=> $request->link??null
            ]);

//        return response()->json($gl_subscription);
//        return response()->json($db_discount);
        $discount_apply_onetime = true;
        $discount_apply_subscription = false;

        if ($db_discount != null) {
            $discount_apply_onetime = $db_discount->appliesOnOneTimePurchase == '1';
            $discount_apply_subscription = $db_discount->appliesOnSubscription == '1';

            if ((int)$db_discount->recurringCycleLimit != 0 && $db_discount->recurringCycleLimit <= $subscription->order_log_count) {
                return ([
                    'error' => 'true',
                    'invoice_url' => 'Discount code reached limit'
                ]);
            }

        }

//        if(isset($gl_subscription->body->data->codeDiscountNodeByCode->codeDiscount->customerGets)){
//            $customer_get_object = $gl_subscription->body->data->codeDiscountNodeByCode->codeDiscount->customerGets;
//            $discount_apply_onetime = $customer_get_object->appliesOnOneTimePurchase;
//            $discount_apply_subscription = $customer_get_object->appliesOnSubscription;
//        }
//        return response()->json($gl_subscription->body->data->codeDiscountNodeByCode->codeDiscount->customerGets);
//        return response()->json($gl_price_rule->body->data);
        $price_rules = json_decode(json_encode($price_rules));
//        return response()->json($price_rules);

        if ($gl_price_rule->errors) {
            return ([
                'invoice_url' => 'Invalid Discount Code',
                'error' => 'true'
            ]);
        }

        if ($gl_price_rule->body->data->priceRule->target == "SHIPPING_LINE") {

            $applied_on = "SHIPPING_LINE";

        } else {
            $applied_on = "LINE_ITEM";
        }

        if ($gl_price_rule->body->data->priceRule->usageLimit != null && $gl_price_rule->body->data->priceRule->usageCount >= $gl_price_rule->body->data->priceRule->usageLimit) {
            return ([
                'invoice_url' => 'This discount has reached its usage limit',
                'error' => 'true',
                'exception' => [
                    'usage_count' => $gl_price_rule->body->data->priceRule->usageCount,
                    'usage_limit' => $gl_price_rule->body->data->priceRule->usageLimit
                ]
            ]);
        }

        if ($gl_price_rule->body->data->priceRule->status != "ACTIVE") {
            return ([
                'invoice_url' => 'Invalid Discount Code',
                'error' => 'true'
            ]);
        }

        if ($price_rules->errors) {
            return ([
                'invoice_url' => 'Invalid Discount Code',
                'error' => 'true'
            ]);
        }
        $price_rule = $price_rules->body->price_rule;
//       return response()->json($price_rules);
//        return($request->all());
        $customer_id = optional($request)->customer_id;
        $is_discount = 'no';
        $discounted_rule_id = null;

        if ($price_rule_id != null) {
            $is_discount = 'yes';
            $discounted_rule_id = $price_rule_id;
        }
//        foreach ($price_rules->body->price_rules as $price_rule) {
//
//
//            if ($price_rule->title == $request->has_discount) {
//
////                return $price_rule;
////                dd($price_rule);
//                $is_discount = 'yes';
//                $discounted_rule_id = $price_rule->id;
//                break;
//            }
//        }


        if ($is_discount == 'yes') {

//            return($price_rule);

//            foreach ($price_rules->body->price_rules as $price_rule) {

            if ($price_rule->id == $discounted_rule_id) {

                //zain
                $shipping_result = true;
                $shipping_country_result = true;
                $customer_result = true;
                $collection_result = true;
                $product_result = true;
                $variant_result = true;
                $date_time = true;
                $code_result = true;
                $usage = true;
                $product_quantity = true;
                $product_subtotal = true;
                $apply_discount_on_collection = false;
                $apply_discount_on_product = false;
                $apply_discont_on_product_amount = 0;

                /**
                 * rule no. 1
                 * if discount applied only selected
                 * customer check
                 */
                if ($price_rule->customer_selection == 'prerequisite') {


                    if (!empty($price_rule->prerequisite_customer_ids) || $price_rule->prerequisite_customer_ids != null) {
                        $customer_result = in_array($request->customer_id, $price_rule->prerequisite_customer_ids);
//                            $error_msg="You are not able to use this discount code";
                        $error_msg = "Please log in to avail the discount code.";
//                            $customer_id=$request->customer_id;
                    }

                }
                /**
                 * rule no. 2 a
                 * if discount applied only selected
                 * products check
                 */
                if (!empty($price_rule->entitled_product_ids) || $price_rule->entitled_product_ids != null) {

                    $flag = false;
                    foreach ($subscription->line_items() as $item) {
//                            return $item;

                        if ($discount_apply_onetime && $discount_apply_subscription) {
                            $product_result = in_array($item->product_id, $price_rule->entitled_product_ids);
                            foreach ($price_rule->entitled_product_ids as $entitled_product_ids) {
                                if ($item->product_id == $entitled_product_ids) {
                                    $product_price = (($item->price - $item->subscription_discount) * $item->quantity);
                                    $apply_discont_on_product_amount += $product_price;
                                    $flag = true;
                                }
                            }
                        } else if ($discount_apply_subscription) {
                            if ($item->isSubscribed()) {
                                $product_result = in_array($item->product_id, $price_rule->entitled_product_ids);
                                foreach ($price_rule->entitled_product_ids as $entitled_product_ids) {
                                    if ($item->product_id == $entitled_product_ids) {
                                        $product_price = (($$item->price - $item->subscription_discount) * $item->quantity);
                                        $apply_discont_on_product_amount += $product_price;
                                        $flag = true;
                                    }
                                }
                            }
                        } else {
                            if (!$item->isSubscribed()) {
                                $product_result = in_array($item->product_id, $price_rule->entitled_product_ids);
                                foreach ($price_rule->entitled_product_ids as $entitled_product_ids) {
                                    if ($item->product_id == $entitled_product_ids) {
                                        $product_price = ($item->price * $item->quantity);
                                        $apply_discont_on_product_amount += $product_price;
                                        $flag = true;
                                    }
                                }
                            }
                        }
                    }

                    $product_result = $flag;
                    $apply_discount_on_product = $product_result;
//                        return $product_result;
                    $error_msg = "Discount code can't applied on these products";

                }
                /**
                 * rule no. 2 b
                 * if discount applied only selected
                 * products variant check
                 */
//                    return response()->json($price_rule);
                if (!empty($price_rule->entitled_variant_ids) || $price_rule->entitled_variant_ids != null) {

                    $flag = false;
                    foreach ($subscription->line_items() as $item) {
//                            return $item;

                        if ($discount_apply_onetime && $discount_apply_subscription) {
                            $variant_result = in_array($item->variant_id, $price_rule->entitled_variant_ids);
                            foreach ($price_rule->entitled_variant_ids as $entitled_product_ids) {
                                if ($item->variant_id == $entitled_product_ids) {
                                    $product_price = (($item->price - $item->subscription_discount) * $item->quantity);
                                    $apply_discont_on_product_amount += $product_price;
                                    $flag = true;
                                }
                            }
                        } else if ($discount_apply_subscription && $item->isSubscribed()) {
                            $variant_result = in_array($item->variant_id, $price_rule->entitled_variant_ids);
                            foreach ($price_rule->entitled_variant_ids as $entitled_product_ids) {
                                if ($item->variant_id == $entitled_product_ids) {
                                    $product_price = (($item->price - $item->subscription_discount) * $item->quantity);
                                    $apply_discont_on_product_amount += $product_price;
                                    $flag = true;
                                }
                            }
                        } else {
                            if (!$item->isSubscribed()) {
                                $variant_result = in_array($item->variant_id, $price_rule->entitled_variant_ids);
                                foreach ($price_rule->entitled_variant_ids as $entitled_product_ids) {
                                    if ($item->variant_id == $entitled_product_ids) {
                                        $product_price = ($item->price * $item->quantity);
                                        $apply_discont_on_product_amount += $product_price;
                                        $flag = true;
                                    }
                                }
                            }
                        }


                    }

                    $variant_result = $flag;
                    $apply_discount_on_product = $variant_result;
//                        return $product_result;
                    $error_msg = "Discount code can't applied on these products";
                }


                /**
                 * rule no. 3
                 * if discount applied only specific
                 * collections check
                 */
                if (!empty($price_rule->entitled_collection_ids) || $price_rule->entitled_collection_ids != null) {


                    $q = 'query nodes($ids: [ID!]!) {
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
                    $var = [];
                    $line_items = $subscription->line_items();
                    foreach ($line_items as $id) {
                        array_push($var, 'gid://shopify/Product/' . $id->product_id);
                    }
                    $respo = $this->api($checkout->storeName)->graph($q, ['ids' => $var]);

                    $respo = (json_decode(json_encode($respo)));
                    $citems = [];
                    foreach ($respo->body->data->nodes as $node) {
                        $collections = [];
                        if ($node != null) {
                            if (count($node->collections->edges) > 0) {
                                foreach ($node->collections->edges as $no) {
                                    array_push($collections, str_replace('gid://shopify/Collection/', '', $no->node->id));
                                }
                            }
//                                array_push($citems,[
//                                    str_replace('gid://shopify/Product/','',$node->id)=>$collections
//                                ]);
                            $citems[str_replace('gid://shopify/Product/', '', $node->id)] = $collections;

                        }
                    }
//                        return $citems;
                    foreach ($line_items as $it) {
//                            return $citems[8001970405614];
//                            if(isset($citems[$it->product_id])){
//                                return $citems[$it->product_id];
//                            }
                        $it->collection = isset($citems[$it->product_id]) ? $citems[$it->product_id] : [];
                    }
//                        return $line_items;


//                        return $line_items;

                    $flag = false;
                    $apply_discont_on_collection_amount = 0;
//                    return response()->json($line_items);
                    foreach ($line_items as $item) {
//                            return $item;
                        if ($discount_apply_onetime && $discount_apply_subscription) {
                            $is_collection_variant = false;
                            if (isset($item->collection) && count($item->collection) > 0) {
                                foreach ($item->collection as $cvp) {
                                    $is_collection_variant1 = in_array($cvp, $price_rule->entitled_collection_ids);
                                    if ($is_collection_variant1) {
                                        $is_collection_variant = true;
                                    }
                                }
                            }

                            if ($is_collection_variant) {
                                $product_price = (($item->price - $item->subscription_discount) * $item->quantity);
                                $apply_discont_on_collection_amount += $product_price;
                                $flag = true;
                            }
                        } else if ($discount_apply_subscription && $item->isSubscribed()) {
                            $is_collection_variant = false;
                            if (isset($item->collection) && count($item->collection) > 0) {
                                foreach ($item->collection as $cvp) {
                                    $is_collection_variant1 = in_array($cvp, $price_rule->entitled_collection_ids);
                                    if ($is_collection_variant1) {
                                        $is_collection_variant = true;
                                    }
                                }
                            }

                            if ($is_collection_variant) {
                                $product_price = (($item->price - $item->subscription_discount) * $item->quantity);
                                $apply_discont_on_collection_amount += $product_price;
                                $flag = true;
                            }
                        } else {
                            if (!$item->isSubscribed()) {
                                $is_collection_variant = false;
                                if (isset($item->collection) && count($item->collection) > 0) {
                                    foreach ($item->collection as $cvp) {
                                        $is_collection_variant1 = in_array($cvp, $price_rule->entitled_collection_ids);
                                        if ($is_collection_variant1) {
                                            $is_collection_variant = true;
                                        }
                                    }
                                }

                                if ($is_collection_variant) {
                                    $product_price = ($item->price * $item->quantity);
                                    $apply_discont_on_collection_amount += $product_price;
                                    $flag = true;
                                }
                            }
                        }
                    }
//                    return response()->json($apply_discont_on_collection_amount);


//                        $all_collections = json_decode($request->collections_calculation);
//                       return $all_collections;
//                        $flag = false;

//                        foreach ($all_collections as $getcollection) {
//                            foreach ($price_rule->entitled_collection_ids as $entitled_collection_id) {
//                                if ($getcollection->collection_id == $entitled_collection_id) {
//                                    $apply_discont_on_collection_amount += $getcollection->total_price;
//                                    $flag = true;
//                                }
//                            }
//                        }
//                        return [
//                            'status'=>$flag,
//                            'items'=>$line_items
//                        ];
                    $collection_result = $flag;
                    $apply_discount_on_collection = $collection_result;
                    $error_msg = "Discount code can't applied on these products";
                }
                /**
                 * rule no. 4
                 * if discount code has usage
                 * limit check
                 */
                if ($price_rule->usage_limit != null) {

                    $code = DiscountCodeLog::where('discount_code', $request->has_discount)->count();

                    if ($code >= $price_rule->usage_limit) {
                        $usage = false;

                        $error_msg = "This discount code cannot be applied";


                    }

                }

                /**
                 * rule no. 4 a
                 * once per customer
                 */

//                if($gl_price_rule->body->data->priceRule->oncePerCustomer == true){
//
//                    if($email == null){
//                        return response()->json(["error"=>"true","invoice_url"=>"Please fill shipping details first"]);
//                    }
//
//                    $code = CustomerDiscountApplied::where('store_name', $checkout->storeName)->where('discount_code', $request->has_discount)->where('email',$email)->count();
//                    if ($code >= 1) {
//                        $usage = false;
//                        $error_msg = "This discount code has already been used";
//                    }
//                }

                /**
                 * rule no. 5
                 * check discount code ended date
                 */
//                if ($price_rule->ends_at != null) {
//
//                    $current_date_time = Carbon::now()->toDateTimeString();
//
//
//                    $start_date = Carbon::parse($price_rule->starts_at)->toDateTimeString();
//
//
//                    $end_date = Carbon::parse($price_rule->ends_at)->toDateTimeString();
//
//
//                    if ($current_date_time >= $start_date && $current_date_time <= $end_date) {
//
//                        $date_time = true;
//                    } else {
//                        $date_time = false;
//                        $error_msg = "This discount code is expired";
//
//                    }
//
//
//                }
//                if ($price_rule->starts_at != null) {
//                    $current_date_time = Carbon::now()->toDateTimeString();
//
//
//                    $start_date = Carbon::parse($price_rule->starts_at)->toDateTimeString();
//
//
//                    if ($current_date_time >= $start_date) {
//                        $date_time = true;
//                    } else {
//                        $date_time = false;
//                        $error_msg = "This discount code is not valid";
//                    }
//                }
                /**
                 * rule no. 6
                 * discount code per customer check
                 */
                if ($price_rule->once_per_customer == true) {

                    if ($email == null) {
                        return (["error" => "true", "invoice_url" => "Please fill shipping details first"]);
                    }

                    $code = CustomerDiscountApplied::where('store_name', $checkout->storeName)->where('discount_code', $request->has_discount)->where('email', $email)->count();
                    if ($code >= 1) {
                        $usage = false;
                        $error_msg = "This discount code has already been used";
                    }
//                    if (isset($request->customer_id)) {
//
//                        $code = DiscountCodeLog::where('customer_shopify_id', $request->customer_id)->where('discount_code', $request->has_discount)->first();
//
//                        if ($code != null) {
//
//                            $code_result = false;
//
//                            $error_msg = "Sorry you have already availed the discount code";
//
//                        }
//                    } else {
//
//                        $code_result = false;
//
//                        $error_msg = "Please log in to avail the discount code";
//
//                    }
                }

                /**
                 * rule no. 7
                 * discount code per item limit
                 */
                if ($price_rule->prerequisite_quantity_range != null) {
                    $flag = false;
//                        $quantity = "this";
                    $quantity = optional($price_rule->prerequisite_quantity_range)->greater_than_or_equal_to;
                    if (
                        isset($price_rule->prerequisite_quantity_range->greater_than_or_equal_to)
                        && $price_rule->prerequisite_quantity_range->greater_than_or_equal_to <= $subscription->line_items()->sum('quantity')
                    ) {
                        $flag = true;
                    }
                    $product_quantity = $flag;
                    $error_msg = "Discount code only be apply on more than " . $quantity . " quantity";
                }
                /**
                 * rule no. 8
                 * discount code per minimum price
                 */
                if ($price_rule->prerequisite_subtotal_range != null) {
                    $flag = false;
//                        $subtotal = "this";
                    $subtotal = optional($price_rule->prerequisite_subtotal_range)->greater_than_or_equal_to;

                    if (
                        isset($price_rule->prerequisite_subtotal_range->greater_than_or_equal_to)
                        && $price_rule->prerequisite_subtotal_range->greater_than_or_equal_to <= $subscription_total
                    ) {
                        $flag = true;
                    }
                    $product_subtotal = $flag;
//                        return $product_result;
                    $error_msg = "Discount code only be applied on more than " . optional($shop)->currency_symbol . $subtotal . " subtotal.";
                }

                /**
                 * rule no. 9
                 * discount applied on shipping
                 */
                if (!empty($price_rule->prerequisite_shipping_price_range) || $price_rule->prerequisite_shipping_price_range != null) {

                    $flag = false;
//                        $subtotal = "this";
//                         return response()->json($price_rule->prerequisite_shipping_price_range->less_than_or_equal_to);
                    if (
                        isset($price_rule->prerequisite_shipping_price_range->less_than_or_equal_to)
                        && $price_rule->prerequisite_shipping_price_range->less_than_or_equal_to >= $checkout->oldShippingValue
                    ) {
                        $flag = true;
                    }
                    $shipping_result = $flag;
//                        return $product_result;
                    $error_msg = "This discount code isn’t available for your shipping address";

                }


                if (isset($gl_price_rule->body->data->priceRule->shippingEntitlements->countryCodes)
                    &&
                    count($gl_price_rule->body->data->priceRule->shippingEntitlements->countryCodes) >= 1
                ) {
                    $flag = false;
                    $countries = $gl_price_rule->body->data->priceRule->shippingEntitlements->countryCodes;


                    $country_selected = Country::find(optional($ch_shipping_form)->country);
//                        return response()->json([$country_selected->code,$countries]);
                    if ($country_selected) {
                        $flag = in_array($country_selected->code, $countries);
                    }

                    $shipping_country_result = $flag;
//                        return $product_result;
                    $error_msg = "This discount code isn’t available for your shipping address";

                }


                if ($shipping_country_result && $shipping_result && $product_subtotal && $product_quantity && $customer_result && $product_result && $variant_result && $collection_result && $usage && $date_time && $code_result) {
                    $service_tax = optional($request)->service_tax;
                    $service_fee = optional($request)->service_fee;
                    $min_value = optional($request)->min_cart_fee;
                    $multi_value = optional($request)->multi_cart_fee;
                    $shipping_fee = optional($request)->shipping_fee;
                    $cart_total = $subscription_total;//$subscription->line_items()->sum('original_line_price');
                    $total_calculated_amount = $cart_total + $service_tax + $service_fee + $min_value + $multi_value + $shipping_fee;
                    $total_cart_amount_without_custom_charges = $cart_total;// ($cart_data->total_price);

                    $line_items = [];
                    foreach ($subscription->line_items() as $item) {
                        array_push($line_items, [
                            "variant_id" => $item->variant_id,
                            "quantity" => $item->quantity,
                        ]);
                    }
                    if ($service_tax != 0) {
                        array_push($line_items, [
                            "title" => "Service Tax",
                            "price" => $service_tax,
                            "quantity" => 1
                        ]);
                    }
                    if ($service_fee != 0) {
                        array_push($line_items, [
                            "title" => "Service Fee",
                            "price" => $service_fee,
                            "quantity" => 1
                        ]);
                    }
                    if ($min_value != 0) {
                        array_push($line_items, [
                            "title" => "Small Cart Fee",
                            "price" => $min_value,
                            "quantity" => 1
                        ]);
                    }
                    if ($multi_value != 0) {
                        array_push($line_items, [
                            "title" => "Multi Cart Fee",
                            "price" => $multi_value,
                            "quantity" => 1
                        ]);
                    }


                    if ($price_rule->value_type == 'fixed_amount') {
                        $value = $price_rule->value;
                        $value = ltrim($value, $value[0]);
                        $amount = $value;
                        $discount_type = "fixed_amount";
                        $cart_discount_amount = $value;
//                            $draft_order = $shop->api()->rest('post', '/admin/draft_orders.json', [
//                                "draft_order" => [
//                                    "line_items" => $line_items,
//                                    "applied_discount" => [
//                                        "description" => "Custom discount",
//                                        "value_type" => $price_rule->value_type,
//                                        "value" => $value,
//                                        "amount" => $amount,
//                                        "title" => $price_rule->title,
//                                    ],
//                                    "shipping_line" => [
//
//                                        "title" => "custom shipping",
//                                        "custom" => true,
//                                        "handle" => null,
//                                        "price" => $shipping_fee,
//                                    ],
//
//
//                                ]
//                            ]);
                    }
                    if ($price_rule->value_type == 'percentage') {
                        $value = $price_rule->value;
                        $discount_type = "percentage";
//                            return $value;
                        $value = ltrim($value, $value[0]);
                        $price_rule_value = $value;

                        if ($apply_discount_on_collection == true) {
                            $amount = ($apply_discont_on_collection_amount * $value) / 100;
                            $price_rule_value_type = 'fixed_amount';
                            $value = $amount;
//                            return response()->json([$apply_discont_on_collection_amount,$value]);
                        } elseif ($apply_discount_on_product == true) {

                            $amount = ($apply_discont_on_product_amount * $value) / 100;
                            $price_rule_value_type = 'fixed_amount';
                            $value = $amount;

                        } elseif ($applied_on == "SHIPPING_LINE") {
                            $amount = ($checkout->oldShippingValue * $value) / 100;
                            $value = $amount;
                        } else {
//                                $amount = ($total_calculated_amount * $value) / 100;
//                            $amount = ($total_cart_amount_without_custom_charges * $value) / 100;
////                                $price_rule_value_type=$price_rule->value_type;
//                            $price_rule_value_type = 'fixed_amount';
//                            $value = $amount;

                            if($discount_apply_onetime && $discount_apply_subscription){


                                //                                $amount = ($total_calculated_amount * $value) / 100;
                                $amount = ($total_cart_amount_without_custom_charges * $value) / 100;
//                                $price_rule_value_type=$price_rule->value_type;
                                $price_rule_value_type = 'fixed_amount';



                            }
                            else if($discount_apply_subscription){
                                if($cart_data->subscription_discount == 0){
                                    return response()->json([
                                        'invoice_url' => "Discount code isn’t valid for the items in your cart",
                                        'error' => 'true'
                                    ]);
                                }
                                $amount = ($cart_data->subscription_discount * $value) / 100;
                            }
                            else{
//                                return $cart_data->one_time_purchase_price;
                                if($cart_data->one_time_purchase_price == 0){
                                    return response()->json([
                                        'invoice_url' => "Discount code isn’t valid for the items in your cart",
                                        'error' => 'true'
                                    ]);
                                }
                                $amount = ($cart_data->one_time_purchase_price* $value) / 100;
                            }
                            $value = $amount;

                        }

                        $cart_discount_amount = $value;
//                            if($apply_discount_on_product==true){
//                                return $amount;
//                            }
//                            return $amount;
//                            $draft_order = $shop->api()->rest('post', '/admin/draft_orders.json', [
//                                "draft_order" => [
//                                    "line_items" => $line_items,
//                                    "applied_discount" => [
//                                        "description" => "Custom discount",
//                                        "value_type" => $price_rule_value_type,
//                                        "value" => $value,
//                                        "amount" => $amount,
//                                        "title" => $price_rule->title,
//                                    ],
//                                    "shipping_line" => [
//
//                                        "title" => "custom shipping",
//                                        "custom" => true,
//                                        "handle" => null,
//                                        "price" => $shipping_fee,
//                                    ],
//
//                                ]
//                            ]);
                    }
//                        $draft_order = json_decode(json_encode($draft_order));
//                        return($draft_order);
                    if (true) {
                        if ($applied_on == "SHIPPING_LINE") {
                            $c_total = $checkout->oldShippingValue;
                        } else {

                            $c_total = $subscription_total;//$cart_data->original_total_price;
                        }
                        $discounted_amount = $cart_discount_amount;
                        if ($discounted_amount >= $c_total) {
                            $discounted_amount = $c_total;
                        }
                        $discounted_amount = number_format($discounted_amount, 2);

                        $discount_amount = $amount;
                        if ($amount >= $c_total) {
                            $discount_amount = $c_total;
                        }
                        $discount_amount = number_format($discount_amount, 2);

                        if ($applied_on == "SHIPPING_LINE") {

                            if ((int)$checkout->oldShippingValue == 0) {
                                $p_amount = number_format(0, 2);
                            } else {
                                $d_total = $checkout->oldShippingValue;
                                $p_amount = number_format(($discount_amount * 100) / $d_total, 2);
                            }
                        } else {
                            if ((float)$subscription_total == 0) {
                                $p_amount = number_format(0, 2);
                            } else {
                                $d_total = $subscription_total;
                                $p_amount = number_format(($discount_amount * 100) / $d_total, 2);
                            }
                        }

                        $invoice_url = "Discount Applied!";//$draft_order->body->draft_order->invoice_url;
                        if ($discount_type == 'percentage') {

                            if ($cart_data->isSubscribe()) {
                                return ([
                                    'discount_value' => $discounted_amount,
                                    'discount_amount' => $p_amount,
                                    'discount_type' => $applied_on == "SHIPPING_LINE" ? 'shipping' : 'fixed_amount',
                                    'invoice_url' => $invoice_url,
                                    'coupon_code' => $request->has_discount,
                                    'error' => 'false',
                                    "applied_on" => $applied_on
                                ]);
                            }
                            return ([
                                'discount_value' => $discounted_amount,
                                'discount_amount' => $p_amount,
                                'discount_type' => $applied_on == "SHIPPING_LINE" ? 'shipping' : 'percentage',
                                'invoice_url' => $invoice_url,
                                'coupon_code' => $request->has_discount,
                                'error' => 'false',
                                "applied_on" => $applied_on
                            ]);
                        }
                        if ($discount_type == 'fixed_amount') {

                            if ($price_rule->value_type == 'percentage'/* &&($apply_discount_on_collection==true || $apply_discount_on_product==true )*/) {
                                return ([
                                    'discount_value' => $price_rule_value,
                                    'discount_amount' => $p_amount,
                                    'discount_type' => $applied_on == "SHIPPING_LINE" ? 'shipping' : 'percentage',
                                    'invoice_url' => $invoice_url,
                                    'coupon_code' => $request->has_discount,
                                    'error' => 'false',
                                    "applied_on" => $applied_on

                                ]);
                            }
                            return ([
                                'discount_value' => $discounted_amount,
                                'discount_amount' => $discount_amount,
                                'discount_type' => 'fixed_amount',
                                'invoice_url' => $invoice_url,
                                'coupon_code' => $request->has_discount,
                                'error' => 'false',
                                "applied_on" => $applied_on

                            ]);
                        }
                    } else {

                        return ([
                            'invoice_url' => 'Something went wrong. Please try again later',
                            'error' => 'true',

                        ]);
                    }
                } else {

                    return ([
                        'invoice_url' => $error_msg,
                        'error' => 'true',
                    ]);
                }
            }

//            }


        } else {
            if ($request->has_discount == null) {
                return ([
                    'invoice_url' => 'Please enter your discount code first',
                    'error' => 'true'
                ]);
            } else {
                return ([
                    'invoice_url' => 'Invalid Discount Code',
                    'error' => 'true'

                ]);
            }
        }
    }


    public function createOrderProcess($sub, $cart_order_transaction, $calculation)
    {

        $checkout = $sub->checkout;
        $payment_method = PaymentMethod::find($cart_order_transaction->payment_method_id);

        $user = User::where('shopifyShopDomainName', $checkout->storeName)->first();

        $financial_status = "pending";

//        if ($cart_order_transaction->source_name == 'paypal') {
        $trans_id = $cart_order_transaction->source_id;
//        } else {
//            $trans_id = $request->input('transaction_id');
//        }

        $trans_kind = "authorization";


        if ($cart_order_transaction->source_name != 'cash') {
            $trans_kind = "capture";
            $financial_status = "paid";

            $transaction_status = [
                [
                    "amount" => $calculation->TotalValue,
                    "kind" => $trans_kind,
                    "status" => "success",
                    'gateway' => $cart_order_transaction->source_name,
                    'source_name' => 'web',
                    'authorization' => $cart_order_transaction->source_id,
                ]
            ];

        } else {
            $trans_kind = "sale";
            $financial_status = "pending";

            $transaction_status = [
                [
                    "amount" => $calculation->TotalValue,
                    "kind" => $trans_kind,
                    "status" => "pending",
                    'gateway' => $payment_method->title,
                    'source_name' => 'web',
                ]
            ];
        }


        $cart = Cart::where('checkout_id', $checkout->id)->first();
//        $previous_exist = ThankyouPage::where('cart_id',$request->cart_id)->first();
//        if($previous_exist != null){
//            return redirect(url(env('SHOP_DOMAIN') . "/a/secure/checkout/{$previous_exist->shopify_cart_id}?customer_id=null"));
//        }
        $line_items = [];
        $prop = json_decode($sub->properties);
        $parms = [];
        foreach ((array)$prop as $k=>$vl){
            if($k != null){
                array_push($parms,[
                    "name"=>$k,
                    "value"=>$vl
                ]);
            }
        }
        array_push($line_items, [
            "variant_id" => $sub->product_variant_id,
            "quantity" => $sub->quantity,
            "properties"=>$parms
        ]);


        if ($payment_method != null && $payment_method->variant == 'cash') {
            $cod_price = 0;
            if ($payment_method->extraFeeType == "fixedPrice") {
                $cod_price = $payment_method->extraFee;
                if ($cod_price > 0) {
                    array_push($line_items, [
                        'title' => 'Payment Fee COD',
                        'price' => $cod_price,
                        'quantity' => 1,
                        "fulfillment_status" => "fulfilled",
                    ]);
                }
            }
            if ($payment_method->extraFeeType == "percentage") {
                $cod_price = $checkout->oldTotalValue * $payment_method->extraFee / 100;
                if ($cod_price > 0) {
                    array_push($line_items, [
                        'title' => 'Payment Fee COD',
                        'price' => $cod_price,
                        'quantity' => 1,
                        "fulfillment_status" => "fulfilled",
                    ]);
                }
            }
//            array_push()
            $checkout->CODPrice = $cod_price;
            $checkout->save();
        }
//        return response()->json(["line"=>$line_items,'payemt'=>$payment_method],500);

        $ch_shipping_form = json_decode($checkout->oldShippingFormDetails);
        $ch_billing_form = json_decode($checkout->oldBillingFormDetails);
        $email = optional($ch_shipping_form)->email;

        $fd_thankyou_data = json_decode($checkout->oldThankYouPageData);
        if (isset($fd_thankyou_data->shippingName)) {
            $shipping_title = $fd_thankyou_data->shippingName;
        } else {
            $shipping_title = 'basic';
        }
        if ($checkout->oldShippingOptionDescription != "") {
            $shipping_title = $checkout->oldShippingOptionDescription;
        }
        if ($cart->line_items()->where('requires_shipping', 1)->exists()) {
            $shipping_line = [
                [
                    "custom" => true,
                    "price" => $checkout->oldShippingValue,
                    "title" => $shipping_title,
                ]
            ];
        } else {
            $shipping_line = [];
        }

        $country_selected = Country::find(optional($ch_shipping_form)->country);
        $state_selected = State::find(optional($ch_shipping_form)->state);
        $country_selected_b = Country::find(optional($ch_billing_form)->country);
        $state_selected_b = State::find(optional($ch_billing_form)->state);

        $shipping = [
            "address1" => optional($ch_shipping_form)->address,
            "city" => optional($ch_shipping_form)->city,
            "first_name" => optional($ch_shipping_form)->firstName,
            "last_name" => optional($ch_shipping_form)->lastName,
            "province" => optional($state_selected)->name,//optional($ch_shipping_form)->stateName,
            "country" => optional($country_selected)->name,//optional($ch_shipping_form)->countryName,
            "zip" => optional($ch_shipping_form)->zipCode,
            "phone" => optional($ch_shipping_form)->phone,
            "name" => optional($ch_shipping_form)->firstName . ' ' . optional($ch_shipping_form)->lastName,
        ];
//        return $shipping;
        if ($checkout->oldIsBillingAddressSame != 1) {
            $billing = [
                "address1" => optional($ch_billing_form)->address,
                "city" => optional($ch_billing_form)->city,
                "first_name" => optional($ch_billing_form)->firstName,
                "last_name" => optional($ch_billing_form)->lastName,
                "province" => optional($state_selected_b)->name,//optional($ch_billing_form)->stateName,
                "country" => optional($country_selected_b)->name,//optional($ch_billing_form)->countryName,
                "zip" => optional($ch_billing_form)->zipCode,
                "phone" => optional($ch_billing_form)->phone,
                "name" => optional($ch_billing_form)->firstName . ' ' . optional($ch_billing_form)->lastName,
            ];
        } else {
            $billing = $shipping;
        }


        $tax_line = [
            [
                "price" => $calculation->TotalTax,
                "rate" => number_format(($calculation->TotalTax) / $calculation->SubTotalValue, 2),
                "title" => "Tax"
            ]
        ];
//        return response()->json([$checkout->oldDiscountCode != '' , $checkout->oldDiscountCode != 'null' , $checkout->oldDiscountCode != null,$checkout->oldDiscountCode]);
        /*
          if (($checkout->oldDiscountCode != '' || $checkout->oldDiscountCode != null)) {

              if(!$checkout->oldDiscountedAmount && $checkout->oldDiscountType == "percentage"){
                  $discount_type = "fixed_amount";
                  $discount_amount = $checkout->oldDiscountedValue;
              }else{
                  $discount_type = $checkout->oldDiscountType;
                  $discount_amount = $checkout->oldDiscountedAmount;
              }

              $discount_applied = [
                  [
                      "type" => $discount_type, //"fixed_amount",//
                      "code" => $checkout->oldDiscountCode,
                      "amount" => $discount_type == "percentage"?$discount_amount:$checkout->oldDiscountedValue,
                  ]
              ];
          } else {
              if($cart->discount_title != '' || $cart->discount_title != null){
                  $discount_applied = [
                      [
                          "type" => 'fixed_amount',//$cart->discount_type, //"fixed_amount",//
                          "code" => $cart->discount_title,
                          "amount" => $cart->total_discount,
                      ]
                  ];
              }else{
                  $discount_applied = [];
              }
          }
        */
//        "SubTotalValue"=>$calc["SubTotalValue"],
//              "TotalValue"=> $total,
//              "TotalTax"=> $calc["TotalTax"],
//              "TotalDiscount" => $totalDiscount,
//              "DiscountCode"=>$discount_title
        $discount_applied = [[
            "type" => 'fixed_amount',//$cart->discount_type, //"fixed_amount",//
            "code" => $calculation->DiscountCode,
            "amount" => $calculation->TotalDiscount,
        ]];
//        return response()->json($discount_applied);

//        $transaction_status = [
//            [
//                "amount" => $checkout->oldTotalValue,
//                "kind" => $trans_kind,
//                "status" => "success"
//            ]
//        ];

//        if($request->transaction_status == null){
//            $financial_status  = "pending";
//        }
//        else{
//            $financial_status = "paid";
//        }

        $orderData = [
            "order" => [
                "line_items" => $line_items,
                "note" => "Subscription Order",
//                "inventory_behaviour" => 'decrement_obeying_policy',
                "inventory_behaviour" => 'decrement_ignoring_policy',
                "email" => $email,
                "tags" => "checkout_republic",
                "shipping_address" => $shipping,
                "billing_address" => $billing,
                "shipping_lines" => $shipping_line,
                "tax_lines" => $tax_line,
                "total_tax" => $calculation->TotalTax,
                "discount_codes" => $discount_applied,
                "send_receipt" => false,
                "send_fulfillment_receipt" => false,
                "financial_status" => $financial_status,
                "transactions" => $transaction_status,
            ]
        ];
//        dd($orderData);

//        $shop = User::first();
        $response = $this->api($checkout->storeName)->rest('POST', '/admin/orders.json', $orderData);
//        dd($response);
        $response = json_decode(json_encode($response));
//        dump($response,$orderData);
        if (!$response->errors) {

            $cart_order_transaction->shopify_order_id = $response->body->order->id;
            $cart_order_transaction->transaction_id = $trans_id;
            $cart_order_transaction->save();


            if ($checkout->oldDiscountCode != '' || $checkout->oldDiscountCode != 'null') {
                try {
//                    CustomerDiscountApplied::create([
//                        "store_name" => $checkout->storeName,
//                        "email" => $email,
//                        "discount_code" => $checkout->oldDiscountCode,
//                        "discount_amount" => $checkout->oldDiscountedAmount,
//                        "discount_value" => $checkout->oldDiscountedValue,
//                        "discount_type" => $checkout->oldDiscountType,
//                        "order_id" => $response->body->order->id,
//                    ]);
                } catch (\Exception $x) {
                }
            }


//            try{
            $resp_order = $response->body->order;
            $order_DB = Order::updateOrCreate([
                "shopify_admin_graphql_api_id" => $resp_order->admin_graphql_api_id,
            ],
                [
                    "user_id" => $user->id,
                    "shopify_id" => $resp_order->id,
                    "cart_id" => $cart->id,
                    "shopify_name" => $resp_order->name,
                    "shopify_created_at" => $resp_order->created_at,
                    "financial_status" => $resp_order->financial_status,
                    "fulfillment_status" => $resp_order->fulfillment_status,
                    "cancelled_at" => $resp_order->cancelled_at,
                    "cancel_reason" => $resp_order->cancel_reason,
                    "contact_email" => $resp_order->contact_email,
                    "phone" => $resp_order->phone,
                    "note" => $resp_order->note,
                    "shipping_address" => json_encode($resp_order->shipping_address),
                    "billing_address" => json_encode($resp_order->billing_address),
                    "customer" => json_encode($resp_order->customer),
                    "shipping_lines" => json_encode($resp_order->shipping_lines),
                    "discount_applications" => json_encode($resp_order->discount_applications),
                    "tags" => $resp_order->tags,
                    "total_price" => $resp_order->total_price,
                    "total_discounts" => $resp_order->total_discounts,
                    "shipping_option_title" => $shipping_title,
                    "shipping_option_price" => $checkout->oldShippingValue,
//                  "discount_title"=>$resp_order->,
//                  "discount_price"=>$resp_order->,
                    "current_total_discounts" => $resp_order->current_total_discounts,
                    "total_tax" => $resp_order->total_tax,
                    "current_total_tax" => $resp_order->current_total_tax,
                    "tax_lines" => json_encode($resp_order->tax_lines),
                    "authorization_id" => $trans_id

                ]);


            $subs = SubscribedCustomer::where('parent_transaction_id', $cart_order_transaction->id)->get();

            $subscription_service = new SubscriptionService();
            $sub->next_call_at = $subscription_service->calculateFutureDate($sub->interval);
            $sub->recent_call_at = now();
            $sub->save();
            $s_order_log = SubscriptionOrderLog::create([
                "subscription_customer_id" => $sub->id,
                "shopify_order_name" => $resp_order->name,
                "shopify_order_id" => $resp_order->id,
                "order_id" => $order_DB->id,
                "shopify_order_token"=>$resp_order->token,
            ]);


            $cart_order_transaction->order_id = $order_DB->id;
            $cart_order_transaction->save();

            $resp_lines = $resp_order->line_items;

            foreach ($resp_lines as $lines) {
                OrderLineItem::updateOrCreate([
                    "shopify_admin_graphql_api_id" => $lines->admin_graphql_api_id
                ],
                    [
                        "shopify_id" => $lines->id,
                        "shopify_order_id" => $resp_order->id,
                        "order_id" => $order_DB->id,
                        "title" => $lines->title,
                        "variant_title" => $lines->variant_title,
                        "variant_id" => $lines->variant_id,
                        "product_id" => $lines->product_id,
                        "sku" => $lines->sku,
                        "requires_shipping" => $lines->requires_shipping,
                        "taxable" => $lines->taxable,
                        "quantity" => $lines->quantity,
                        "fulfillable_quantity" => $lines->fulfillable_quantity,
                        "fulfillment_status" => $lines->fulfillment_status,
                        "tax_lines" => json_encode($lines->tax_lines),
                        "properties"=> json_encode($lines->properties),
                        "discount_allocations" => json_encode($lines->discount_allocations),
//                    "image_url"=>$lines->,
                        "price" => $lines->price,
//                    "location_id"=>$lines->,
//                    "location_name"=>$lines->,
                    ]);
            }
            $service = new OrderService();
            $service->setOrder($order_DB, $user);
//            }catch (\Exception $x){}

            return ['errors' => false, "message" => "Order Created on shopify successfully"];

        } else {
            return ["errors" => true, "message" => "Failed to create order in shopify"];
        }
    }


    public function calculateFutureDate($intervalString)
    {
        $now = Carbon::now();

        $intervalString = strtoupper($intervalString);

        if (strpos($intervalString, 'DAY') !== false) {
            $days = intval($intervalString);
            return $now->addDays($days);
        } elseif (strpos($intervalString, 'WEEK') !== false) {
            $weeks = intval($intervalString);
            return $now->addWeeks($weeks);
        } elseif (strpos($intervalString, 'MONTH') !== false) {
            $months = intval($intervalString);
            return $now->addMonths($months);
        } elseif (strpos($intervalString, 'YEAR') !== false) {
            $months = intval($intervalString);
            return $now->addYears($months);
        } else {
            // Handle other intervals or invalid strings here
            return $now;
        }
    }


}