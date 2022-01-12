<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
} 
