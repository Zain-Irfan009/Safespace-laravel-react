<!DOCTYPE html>
<html>
<head>
    <title>Return Order Request</title>
</head>
<body>
    <h1>Return Order Request</h1>
    
    <p>Hey,</p>

    <p>Return Order Request has been created with the following details:</p>

    <ul>
        <li>Customer ID: {{ $returnOrder->customer_id }}</li>
        <li>Order ID: {{ $returnOrder->order_id }}</li>
        <li>Order No: {{ $returnOrder->order_no }}</li>
        <li>Reason: {{ $returnOrder->reason }}</li>
    </ul>

    <p>Thanks.</p>
</body>
</html>
