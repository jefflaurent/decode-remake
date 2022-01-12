<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/decode', 'DecodeController@home')->name('home');

Route::post('/decode/create', 'DecodeController@create');

Route::post('/decode/download', 'SourceCodeController@download');

Route::get('/login', 'AuthController@showLogin')->name('login')->middleware('guest');

Route::post('/login', 'AuthController@login');

Route::post('/logout', 'AuthController@logout');