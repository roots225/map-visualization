<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'MAP VISUALIZATION') }}</title>

        <!-- Fonts -->

        <!-- Styles -->
        @vite(['resources/css/main.scss'])
    </head>
    <body class="antialiased">
        <div id="app"></div>
        @vite(['resources/src/main.ts'])
    </body>
</html>
