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
    return redirect()->route('home');
});

Route::get('/tutorial', 'DecodeController@showTutorial');

Route::get('/decode', 'DecodeController@home')->name('home');

Route::post('/decode/create', 'DecodeController@create')->middleware('auth');

Route::post('/decode/load', 'DecodeController@load')->middleware('auth');

Route::post('/decode/save', 'DecodeController@save')->middleware('auth');

Route::post('/decode/delete', 'DecodeController@delete');

Route::post('/decode/download', 'DecodeController@download');

Route::get('/decode/download/client/{language}', 'DecodeController@downloadToClient');

Route::get('/login', 'AuthController@showLogin')->name('login')->middleware('guest');

Route::post('/login', 'AuthController@login');

Route::post('/logout', 'AuthController@logout')->middleware('auth');