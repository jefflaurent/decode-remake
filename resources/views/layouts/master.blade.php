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

        #block-code-container {
            min-height: 30vh;
        }

        canvas {
            background-color: #C4C4C4;
        }

        @media (max-width: 991px) {
            #accordionTemplates {
                margin-top: 4% !important;
            }
        }
    </style>
    <title>Decode</title>
</head>
<body>
    @include('components.navbar')

    <div style="background-color: #F5F5F5; min-height: 100vh">
        @yield('content')
    </div>

    <script src="/js/jquery-3.6.0.js"></script>
    <script src="/js/logic/program_input.js" type="module"></script>
  
    <script src="https://kit.fontawesome.com/2d0a60027c.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
</body>
</html>