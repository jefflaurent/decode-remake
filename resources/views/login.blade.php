<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
        
        body {
            font-family: 'Roboto' !important;
            min-height: 100vh;
            background-color: lightgrey;
        }

        .blue-btn {
            background-color: #00A9E2; 
            color: white;
        }

        .blue-btn:hover {
            cursor: pointer;
            background-color: #0098cb;
        }

        .input-error {
            border-color: #eb4455;
            box-shadow: 0 0 0 0.1rem #eb4455;
        }

        .change-font-size:hover {
            cursor: pointer;
        }

        #font-size-input {
            border-top: 0; 
            border-left: 0; 
            border-right: 0;
            border-radius: 0
        }

        #font-size-input:focus {
            outline: 0;
            box-shadow: none;
        }

        @media (max-width: 991px) {
            #accordionTemplates {
                margin-top: 4% !important;
            }
        }
    </style>
    <title>Decode | Login</title>
</head>
<body class="d-flex align-items-center justify-content-center">
    <div class="d-flex flex-column justify-content-start align-items-center shadow-sm bg-white rounded p-0" style="min-height: 370px; max-height: 370px; min-width: 370px; max-width: 370px;">
        <div>
            <div class="col-12 col-sm-12 d-flex align-items-stretch justify-content-start" style="min-height: 130px;">
                <div class="col-2 col-sm-2 d-flex justify-content-start">
                    <img src="{{ asset('assets/ribbon.png') }}" class="img-fluid" alt=""/>
                </div>
                <div class="col-6 col-sm-7 d-flex justify-content-start p-3">
                    <img src="{{ asset('assets/binus-logo.png') }}" class="img-fluid" alt=""/>
                </div>
                <div class="col-sm-4 col-3"></div>
            </div>
        </div>
        <form action="/login" method="post" class="d-flex flex-column justify-content-center align-items-center mt-4">
            {{ csrf_field() }}
            <div class="form-group py-1" style="min-width: 250px; max-width: 250px;">
                <input type="text" name="email" class="form-control" placeholder="Username"/>
            </div>
            <div class="form-group py-1" style="min-width: 250px; max-width: 250px">
                <input type="password" name="password" class="form-control" placeholder="Password"/>
            </div>
            @if($errors->any())
            <div class="alert alert-danger py-2 my-1 mb-2" style="min-width: 250px;">
                Invalid Username / Password!
            </div>
            @else
            <div class="mb-4"></div>
            @endif
            <div class="form-group d-flex justify-content-center">
                <button type="submit" class="btn btn-primary d-flex justify-content-center" style="min-width: 250px">Login</button>
            </div>
        </form>
    </div>

    <script src="/js/jquery-3.6.0.js"></script>
    <script src="/js/bundles/program_input.js"></script>
    <script src="https://kit.fontawesome.com/2d0a60027c.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
</body>
</html>