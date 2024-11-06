@php
$emailBody = $settings->emailBody;
$shipping = json_decode($checkout->oldShippingFormDetails);
$emailBody = str_replace('{{store_name}}',$checkout->storeName,$emailBody);
$emailBody = str_replace('{{checkout_link}}',env('APP_URL').'/checkout?id='.$checkout->checkout_uuid,$emailBody);
$emailBody = str_replace('{{customer_name}}',optional($shipping)->first_name??'Customer',$emailBody);
@endphp
{!! $emailBody !!}
