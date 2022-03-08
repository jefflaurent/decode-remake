@extends('layouts.master')

@section('content')
<div class="container pt-5 pb-5">
    <div class="col-12">
        @include('components.tutorial-block')
        <div class="mt-4"></div>
        @include('components.tutorial-web')
    </div>
</div>
@endsection