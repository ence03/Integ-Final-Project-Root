<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\AllUsers;

class StudentLoginController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt(['Username' => $credentials['email'], 'password' => $credentials['password']])) {
            // Get the authenticated user
            $user = Auth::user();

            // Check the user's role and redirect accordingly
            if ($user->RoleID == 3) { //
                return redirect()->intended('/dashboardstudent');
            } elseif ($user->RoleID == 2) { 
                return redirect()->intended('/dashboardteacher');
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
