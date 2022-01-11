<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SourceCodeController extends Controller
{
    public static function download(Request $request) {
        Storage::disk('local')->put('file.txt', 'This is my ftestingile');

        return response()->download(storage_path('/app/file.txt'));
    }
}
