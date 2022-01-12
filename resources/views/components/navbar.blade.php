<nav class="navbar navbar-expand-lg navbar-light bg-light" style="margin: 0; padding: 0;">
    <div class="container-fluid" style="margin: 0; padding: 0;">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12" style="margin: 0; padding: 0; width: 100%;">
            <div class="col-sm-12 col-12 border-bottom pb-2 d-flex justify-content-center">
                <div class="col-sm-11 col-10">
                    <div class="col-xl-6 col-lg-8 col-md-12 col-sm-12 col-8 d-flex align-items-stretch justify-content-start">
                        <div class="col-lg-1 col-md-1 col-sm-1 col-2 d-flex justify-content-end">
                            <img src="{{ asset('assets/ribbon.png') }}" class="img-fluid" alt="">
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-10 d-flex justify-content-start p-3">
                            <img src="{{ asset('assets/binus-logo.png') }}" class="img-fluid" alt="">
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-8"></div>
                    </div>
                    <div class="col-xl-6 col-lg-4 col-md-6"></div>
                </div>
            </div>
            <div class="col-lg-12 border-bottom pb-2 pt-2 shadow-sm d-flex justify-content-center" style="width: 100%; padding: 0; margin: 0">
                <div class="col-lg-11 col-md-11 col-11" style="padding: 0; margin: 0">
                    <div class="container-fluid d-lg-none">
                        <div class="col-lg-12 d-flex justify-content-between align-items-center" style="width: 100%">
                            <div class="col-lg-1" style="width: 100%">
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon" style="color: black"></span>
                                </button>
                            </div>
                            <div class="col-lg-1" style="width: 100%;">
                                <strong class="col-lg-12 col-12 col-sm-12 d-flex justify-content-end">
                                    @auth
                                        <form action="/logout" method="post" class="col-7 col-sm-7 d-flex justify-content-end"> 
                                            {{ csrf_field() }}
                                            <input type="hidden" name="_user_id" value="{{ Auth::user()->user_id }}">
                                            <button type="submit" class="link-secondary text-decoration-none" style="background: none; padding: 0; border: 0">
                                                <div class="col-lg-12 d-flex align-items-center">
                                                    <div class="col-lg-4 d-flex justify-content-end p-2">
                                                        <i class="fas fa-sign-out-alt"></i>
                                                    </div>
                                                    <div class="col-lg-8 d-flex justify-content-end" style="padding: 0; margin: 0;">
                                                        <strong>Sign Out</strong> 
                                                    </div>
                                                </div>
                                            </button>
                                        </form>
                                    @else
                                        <a href="/login" class="link-secondary text-decoration-none justify-content-end col-lg-7 col-7 col-sm-7">
                                            <div class="col-lg-12 col-12 col-sm-12 d-flex align-items-center justify-content-end">
                                                <div class="col-lg-4 d-flex justify-content-end p-2">
                                                    <i class="fas fa-sign-in-alt"></i>
                                                </div>
                                                <div class="col-lg-8 d-flex justify-content-start" style="padding: 0; margin: 0;">
                                                    Sign In
                                                </div>
                                            </div>
                                        </a>
                                    @endif
                                </strong>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid col-lg-12 d-flex justify-content-center align-items-center">
                        <div class="collapse navbar-collapse col-lg-6" id="navbarSupportedContent">
                            <div class="col-lg-1"></div>
                            <div class="col-lg-7 d-flex align-items-center">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between">
                                    <li class="nav-item">
                                        <a class="nav-link link-secondary text-decoration-none" aria-current="page" href="#"><strong>Decode</strong></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link link-secondary text-decoration-none" aria-current="page" href="#"><strong>WebIDE</strong></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link link-secondary text-decoration-none" aria-current="page" href="#"><strong>Oopsy</strong></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link link-secondary text-decoration-none" aria-current="page" href="#"><strong>DaBest</strong></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link link-secondary text-decoration-none" aria-current="page" href="#"><strong>Strukdat</strong></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-lg-4"></div>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end d-none d-lg-flex">
                            <div class="col-lg-12 col-12 col-sm-12" >
                                <strong class="col-12 col-sm-12 d-flex justify-content-end">
                                    @auth
                                        <form action="/logout" method="post" class="col-lg-3 col-3 col-sm-3 d-flex justify-content-end"> 
                                            {{ csrf_field() }}
                                            <input type="hidden" name="_user_id" value="{{ Auth::user()->user_id }}">
                                            <button type="submit" class="link-secondary text-decoration-none" style="background: none; padding: 0; border: 0">
                                                <div class="col-lg-12 d-flex align-items-center">
                                                    <div class="col-lg-4 d-flex justify-content-end p-2">
                                                        <i class="fas fa-sign-out-alt"></i>
                                                    </div>
                                                    <div class="col-lg-8 d-flex justify-content-end" style="padding: 0; margin: 0;">
                                                        <strong>Sign Out</strong> 
                                                    </div>
                                                </div>
                                            </button>
                                        </form>
                                        <div class="col-xl-1"></div>
                                    @else
                                        <a href="/login" class="link-secondary text-decoration-none col-lg-7 col-7 col-sm-7 d-flex justify-content-end">
                                            <div class="col-lg-5 col-5 col-sm-5 d-flex align-items-center">
                                                <div class="col-lg-4 d-flex justify-content-end p-2">
                                                    <i class="fas fa-sign-in-alt"></i>
                                                </div>
                                                <div class="col-lg-8 d-flex justify-content-start" style="padding: 0; margin: 0;">
                                                    Sign In
                                                </div>
                                            </div>
                                        </a>
                                    @endif
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>