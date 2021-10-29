@extends('layouts.master')

@section('content')

<div class="container pt-5 pb-5">
    <div class="row">
        <div class="col-lg-5">
            @include('components.program-control')
        </div>
        <div class="col-lg-7">
            <div class="col-lg-12">
               @include('components.templates')
            </div>
            <div class="col-lg-12">
                @include('components.program-control-input')
            </div>
        </div>
    </div>
    <div class="col-lg-12">
        
    </div>
</div>

@endsection