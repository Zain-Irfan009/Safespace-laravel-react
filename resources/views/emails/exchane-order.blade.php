<!DOCTYPE html>
<html>
<head>
    <title>Exchange Order Request</title>
</head>
<body>
    <h1>Exchange Order Request</h1>
    
    <p>Hey,</p>

    <p>Exchange Order Request has been created with the following details:</p>

    <ul>
        <li>Customer ID: {{ $exchangeOrder->customer_id }}</li>
        <li>Order ID: {{ $exchangeOrder->order_id }}</li>
        <li>Order No: {{ $exchangeOrder->order_no }}</li>
        <li>Reason: {{ $exchangeOrder->reason }}</li>
        <li>New Product: {{ $exchangeOrder->new_product }}</li>
    </ul>

    <p>Thanks.</p>
</body>
</html>
