<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>EnLite Login</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <style>
        body {
            margin: 0;
            font-family: 'Roboto', sans-serif;
            background-color: #0A2656;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #fff;
        }

        .container {
            display: flex;
            align-items: center;
            width: 80%;
            max-width: 1200px;
            justify-content: space-between;
        }

        .login-logo {
            flex: 1;
            text-align: center;
        }

        .login-logo img {
            max-width: 100%;
        }

        .login-form {
            flex: 1;
            color: #000;
            display: flex;
            flex-direction: column;
            margin-top: 50px;
            margin-left: 70px;
            align-items: flex-start;
            background-color: transparent;
        }

        .login-form input {
            width: 360px;
            padding: 20px;
            margin-bottom: 20px;
            border: none;
            border-radius: 4px;
            background-color: #e0dede;
            font-size: 18px;
        }

        .login-form button {
            width: 400px;
            padding: 20px;
            background-color: #007BFF;
            border: none;
            border-radius: 4px;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            margin-top: 20px;
        }

        .login-form button:hover {
            background-color: #0056b3;
        }

        .login-form .password-toggle {
            position: relative;
            display: flex;
            align-items: center;
            width: 400px;
        }

        .login-form .password-toggle input {
            flex-grow: 1;
        }


        .login-form label {
            font-size: 18px;
        }

        .login-form .remember-me {
            display: flex;
            color: #fff;
            margin-top: 25px;
            
        }

        .login-form .remember-me input {
            margin-right: 5px;
        }

        .login-form .remember-me label{
            display: inline-block;
            max-width: 100%;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="login-logo">
            <img src="{{ asset('logo.png') }}" alt="EnLite Logo">
        </div>
        <div class="login-form">
            <form action="{{ route('login') }}" method="POST">
                @csrf
                <input type="text" name="username" placeholder="Username" required>
                <div class="password-toggle">
                    <input type="password" name="password" placeholder="Password" required>
                </div>
                <button type="submit">LOGIN</button>
                <div class="remember-me">
                    <input type="checkbox" name="remember" id="remember">
                    <label for="remember">Remember me</label>
                </div>
                <div class="div">
                    
                </div>
            </form>
        </div>
    </div>
</body>
</html>
