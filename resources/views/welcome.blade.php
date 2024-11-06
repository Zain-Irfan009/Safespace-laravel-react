<html>
<link rel="apple-touch-icon" sizes="180x180" href="{{asset('favicon')}}/apple-touch-icon.png">
{{--<link rel="icon" type="image/png" sizes="32x32" href="{{asset('favicon')}}/favicon-32x32.png">--}}
{{--<link rel="icon" type="image/png" sizes="16x16" href="{{asset('favicon')}}/favicon-16x16.png">--}}
<link rel="manifest" href="{{asset('favicon')}}/site.webmanifest">
{{--<link rel="icon" type="image/png" href="/republicCheckoutLogo.png" />--}}
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{{env('APP_NAME')}}</title>
<script type="text/javascript" src="https://js.stripe.com/v2/"></script>
<body>
<div id="root"></div>
@viteReactRefresh
@vite(['resources/css/app.css', 'resources/js/app.js'])

</body>

</html>

