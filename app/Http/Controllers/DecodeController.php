<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DecodeController extends Controller
{
    public function home() {
        if(Auth::check()) {
            return view('home', ['projects' => Auth::user()->projects]);
        }
    
        return view('home');
    }

    public function create(Request $request) {
        $project = new Project();
        $project->user_id = Auth::user()->user_id;
        $project->project_name = $request->project_name;
        $project->project_statements = $request->project_statements;
        $project->project_variable = $request->project_variable;
        $project->save();
    }

    public function load(Request $request) {
        $project = Project::Where('project_id', '=', $request->project_id)->first();

        return response()->json($project);
    }

    public function save(Request $request) {
        Project::Where('project_id', $request->project_id)->update([
            'project_statements' => $request->project_statements,
            'project_variable' => $request->project_variables
        ]);
    }

    public function delete(Request $request) {
        Project::Where('project_id', $request->project_id)->delete();
    }

    public function download(Request $request) {
        $user_id = 0;

        if(Auth::check()) {
            $user_id = Auth::user()->user_id;
        }

        Storage::put($user_id . ".txt", $request->source_code);

        // Storage::disk('local')->put('sourcecode' . $extension, $request->source_code);

        // return response()->download(storage_path('/app/sourcecode.txt'), 'sourcecode.txt');
    }

    public function downloadToClient($language) {
        $file_name = 'sourcecode';
        $extension = '';
        $user_id = 0;

        if(Auth::check()) {
            $user_id = Auth::user()->user_id;
        }

        if(strcmp($language, 'c') == 0) {
            $extension = '.c';
        }
        else if(strcmp($language, 'cpp') == 0) {
            $extension = '.cpp';
        }
        else if(strcmp($language, 'cs') == 0) {
            $extension = '.cs';
        }
        else if(strcmp($language, 'java') == 0) {
            $extension = '.java';
        }
        else if(strcmp($language, 'python') == 0) {
            $extension = '.py';
        }
        else {
            $extension = '.txt';
        }

        $storage_path = storage_path("app/". $user_id . ".txt");

        return response()->download($storage_path, $file_name . $extension);
    }
} 
