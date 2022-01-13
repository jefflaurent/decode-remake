<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLogin() {
        return view('login');
    }

    public function login(Request $request) {
        $this->validate($request, [
            'email' => 'bail|required', 
            'password' => 'required'
        ]);

        $credentials = ['email' => $request->email, 'password' => $request->password];

        if(Auth::attempt($credentials)) {
            request()->session()->regenerate();
            return redirect()->route('home');
        }
        else {
            return redirect()->route('login')->with('error', 'x');
        }
    }

    public function logout() { 
        Auth::logout();
        request()->session()->regenerate();
        request()->session()->invalidate();
        
        return redirect()->route('login');
    }
}
