<?php

namespace App\Services;

use App\Http\Controllers\BaseController;
use App\Models\Fulfillment;
use App\Models\FulfillmentLineItem;
use App\Models\Order;
use App\Models\OrderLineItem;
use App\Models\Refund;
use App\Models\RefundLineItem;
use App\Models\Transaction;

class OrderService
{
    public function setOrder($order,$shop)
    {
        $helper = new BaseController();
        $query = '{
      order(id: "'.$order->shopify_admin_graphql_api_id.'") {
            fulfillmentOrders(first: 10) {
              nodes {
                assignedLocation {
                  name
                  location {
                    id
                  }
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
            transactions(first: 1) {
              id
              amount
            }
         }
      }';
       $resp = $helper->api($shop->shopifyShopDomainName)->graph($query);
       $resp = json_decode(json_encode($resp));

       if($resp->errors == false){
           $resp_trans = $resp->body->data->order->transactions;
           $resp_order = $resp->body->data->order;
           $resp_lines = $resp->body->data->order->lineItems->nodes;
           $fulfillments_order = $resp_order->fulfillmentOrders->nodes;
           foreach ($resp_lines as $line){
               $img_src = optional($line->image)->src;
               $item_db = OrderLineItem::where('shopify_admin_graphql_api_id',$line->id)->first();
               if($item_db){
                   $item_db->image_url = $img_src;
                   $item_db->save();
               }
           }
           foreach ($fulfillments_order as $fulfillment){
               if(isset($fulfillment->assignedLocation->name)){
                   $name = $fulfillment->assignedLocation->name;
                   $location_id = optional($fulfillment->assignedLocation->location)->id;
                   foreach ($fulfillment->lineItems->nodes as $item){
                       $line = $item->lineItem;
                       $item_db = OrderLineItem::where('shopify_admin_graphql_api_id',$line->id)->first();
                       if($item_db){
                           $item_db->location_name = $name;
                           $item_db->location_id = $location_id;
                           $item_db->save();
                       }
                   }
               }
           }
           if(isset($resp_trans[0]->id)){
               $order->transaction_id = str_replace("gid://shopify/OrderTransaction/","",$resp_trans[0]->id);
               $order->save();
           }
           if(isset($resp_trans[0]->amount)){
               $order->transaction_amount = $resp_trans[0]->amount;
               $order->save();
           }
       }
    }

    public function syncOrder($resp_order,$user){
        $order_DB =  Order::updateOrCreate([
            "shopify_admin_graphql_api_id"=> $resp_order->admin_graphql_api_id,
        ],
            [
                "user_id"=> $user->id,
                "shopify_id"=>$resp_order->id,
//                "cart_id"=>$cart->id,
                "shopify_name"=>$resp_order->name,
                "closed_at"=>$resp_order->closed_at,
                "shopify_created_at"=>$resp_order->created_at,
                "financial_status"=>$resp_order->financial_status,
                "fulfillment_status"=>$resp_order->fulfillment_status,
                "cancelled_at"=>$resp_order->cancelled_at,
                "cancel_reason"=>$resp_order->cancel_reason,
                "contact_email"=>$resp_order->contact_email,
                "phone"=>$resp_order->phone,
                "note"=>$resp_order->note,
                "note_attributes"=> json_encode(optional($resp_order)->note_attributes),
                "shipping_address"=> json_encode($resp_order->shipping_address),
                "billing_address"=>json_encode($resp_order->billing_address),
                "customer"=>json_encode($resp_order->customer),
                "shipping_lines"=>json_encode($resp_order->shipping_lines),
                "discount_applications"=>json_encode($resp_order->discount_applications),
                "tags"=>$resp_order->tags,
                "total_price"=>$resp_order->total_price,
                "total_discounts"=>$resp_order->total_discounts,
//                "shipping_option_title"=>$shipping_title,
//                "shipping_option_price"=>$checkout->oldShippingValue,
//                  "discount_title"=>$resp_order->,
//                  "discount_price"=>$resp_order->,
                "current_total_discounts"=>$resp_order->current_total_discounts,
                "total_tax"=>$resp_order->total_tax,
                "current_total_tax"=>$resp_order->current_total_tax,
                "tax_lines"=>json_encode($resp_order->tax_lines),
            ]);
        $resp_lines = $resp_order->line_items;
        $resp_refunds = $resp_order->refunds;
        $resp_fulfillments = $resp_order->fulfillments;

        OrderLineItem::where('order_id',$order_DB->id)->update(["is_removed"=>1]);
        foreach ($resp_lines as $lines){
            OrderLineItem::updateOrCreate([
                "shopify_admin_graphql_api_id" => $lines->admin_graphql_api_id
            ],
                [
                    "is_removed"=>0,
                    "shopify_id"=>$lines->id,
                    "shopify_order_id"=>$resp_order->id,
                    "order_id"=>$order_DB->id,
                    "title"=>$lines->title,
                    "variant_title"=>$lines->variant_title,
                    "variant_id"=>$lines->variant_id,
                    "product_id"=>$lines->product_id,
                    "sku"=>$lines->sku,
                    "requires_shipping"=>$lines->requires_shipping,
                    "taxable"=>$lines->taxable,
                    "quantity"=>$lines->quantity,
                    "fulfillable_quantity"=>$lines->fulfillable_quantity,
                    "fulfillment_status"=>$lines->fulfillment_status,
                    "tax_lines"=> json_encode($lines->tax_lines),
                    "properties"=> json_encode($lines->properties),
                    "discount_allocations"=>json_encode($lines->discount_allocations),
//                    "image_url"=>$lines->,
                    "price"=>$lines->price,
//                    "location_id"=>$lines->,
//                    "location_name"=>$lines->,
                ]);
        }

        foreach ($resp_fulfillments as $fulfillment){
            $this->fulfillment_save_db($fulfillment);
        }

        foreach ($resp_refunds as $refund){
            $this->refund_save_db($refund);
        }

        $this->setOrder($order_DB,$user);
    }

    public function fulfillment_save_db($fulfillment){
        $order = Order::where('shopify_id',$fulfillment->order_id)->first();
        $sv_fulfillment = Fulfillment::updateOrCreate([
            "shopify_id"=>$fulfillment->id
        ],[
            "shopify_order_id"=>$fulfillment->order_id,
            "order_id"=>$order->id,
            "admin_graphql_api_id"=>$fulfillment->admin_graphql_api_id,
            "shopify_create_at"=>$fulfillment->created_at,
            "location_id"=>$fulfillment->location_id,
            "name"=>$fulfillment->name,
            "service"=>$fulfillment->service,
            "shipment_status"=>$fulfillment->shipment_status,
            "status"=>$fulfillment->status,
            "tracking_company"=>$fulfillment->tracking_company,
            "tracking_number"=>$fulfillment->tracking_number,
            "tracking_url"=>$fulfillment->tracking_url,
            "origin_address"=>json_encode($fulfillment->origin_address),
            "receipt"=> json_encode($fulfillment->receipt),
        ]);

        foreach ($fulfillment->line_items as $line){
            $sv_line = OrderLineItem::where('shopify_id',$line->id)->first();
            FulfillmentLineItem::updateOrCreate([
                "shopify_id"=> $line->id
            ],[
                "line_item_id"=>optional($sv_line)->id,
                "admin_graphql_api_id"=>$line->admin_graphql_api_id,
                "fulfillment_id"=>$sv_fulfillment->id,
                "order_id"=>$order->id,
                "fulfillable_quantity"=>$line->fulfillable_quantity,
                "fulfillment_service"=>$line->fulfillment_service,
                "fulfillment_status"=>$line->fulfillment_status,
                "gift_card"=>$line->gift_card,
                "grams"=>$line->grams,
                "name"=>$line->name,
                "price"=>$line->price,
                "product_exists"=>$line->product_exists,
                "product_id"=>$line->product_id,
                "quantity"=>$line->quantity,
                "requires_shipping"=>$line->requires_shipping,
                "sku"=>$line->sku,
                "taxable"=>$line->taxable,
                "title"=>$line->title,
                "total_discount"=>$line->total_discount,
                "variant_id"=>$line->variant_id,
                "variant_inventory_management"=>$line->variant_inventory_management,
                "variant_title"=>$line->variant_title,
                "vendor"=>$line->vendor,
                "tax_lines"=>json_encode($line->tax_lines),
                "duties"=>json_encode($line->duties),
                "discount_allocations"=>json_encode($line->discount_allocations),
            ]);
        }
    }


    public function refund_save_db($refund){
        $order = Order::where('shopify_id',$refund->order_id)->first();
        $sv_refund = Refund::updateOrCreate([
            "shopify_id"=>$refund->id
        ],[
            "shopify_order_id"=>$refund->order_id,
            "shopify_created_at"=>$refund->created_at,
            "admin_graphql_api_id"=>$refund->admin_graphql_api_id,
            "order_id"=>optional($order)->id,
            "restock"=>$refund->restock,
            "return"=>optional($refund)->return,
            "note"=>$refund->note,
//            "shipping"=>$refund->order_id,
            "duties"=>json_encode($refund->duties),
            "total_duties_set"=>json_encode($refund->total_duties_set),
//            "additional_fees"=>json_encode($refund->order_id),
//            "total_additional_fees_set"=>json_encode($refund->order_id),

        ]);
        foreach ($refund->refund_line_items as $line){
            $sv_line = OrderLineItem::where('shopify_id',$line->line_item_id)->first();
            RefundLineItem::updateOrCreate([
                "shopify_id"=> $line->id
            ],[
                "shopify_line_item_id"=>$line->line_item_id,
                "shopify_location_id"=>$line->location_id,
                "quantity"=>$line->quantity,
                "order_id"=>$order->id,
                "refund_id"=>$sv_refund->id,
                "line_item_id"=>optional($sv_line)->id,
                "restock_type"=>$line->restock_type,
                "subtotal"=>$line->subtotal,
                "total_tax"=>$line->total_tax,
            ]);

            if($sv_line && isset($line->line_item->quantity)){

            }
        }
        if(isset($refund->transactions[0]->amount)){
            $this->transaction_save_db($refund->transactions[0]);
            $sv_refund->amount = $refund->transactions[0]->amount;
            $sv_refund->save();
        }

    }
    public function transaction_save_db($transaction){
        $order = Order::where('shopify_id',$transaction->order_id)->first();
        Transaction::updateOrCreate([
            "shopify_id"=>$transaction->id
        ],[
            "order_id"=>optional($order)->id,
            "user_id"=>optional($order)->user_id,
            "shopify_order_id"=>$transaction->order_id,
            "shopify_admin_graphql_api_id"=>$transaction->admin_graphql_api_id,
            "shopify_location_id"=>$transaction->location_id,
            "authorization"=>$transaction->authorization,
            "kind"=>$transaction->kind,
            "gateway"=>$transaction->gateway,
            "status"=>$transaction->status,
            "amount"=>$transaction->amount,
            "processed_at"=>$transaction->processed_at,
            "shopify_created_at"=>$transaction->created_at,
            "message"=>$transaction->message,
        ]);
    }



    public function getApiFormat($resp){

    }
}