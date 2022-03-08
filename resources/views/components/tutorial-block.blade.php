<div class="accordion" id="accordionTutorialBlockCode">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTutorialBlock" aria-expanded="true" aria-controls="collapseTutorialBlock" style="background-color: #00A9E2; color: white">
                Tutorial: Block Code
            </button>
        </h2>
        <div id="collapseTutorialBlock" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="container-fluid">
                    <div class="col-12">
                        <!-- Row 1  -->
                        <div class="col-12 d-flex">
                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>1</h1>
                            </div>
                            <!-- Tutorial Declare -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Declaring a Variable</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        To get started, let's declare a variable. <br>
                                        A variable is used to store values, there are 6 different variable data types. <br>
                                        Hover to buttons below to see description.
                                    </div>
                                    <div class="col-12">
                                        <div class="col-12 d-flex justify-content-between mt-2">
                                            <div class="col-4 d-flex justify-content-start"  data-toggle="tooltip" data-placement="top" title="Integer is used to store round numbers ranging from -2,147,483,647 to 2,147,483,647">
                                                <div class="col-11 d-flex justify-content-center align-items-center p-1 blue-btn">Integer</div>
                                            </div>
                                            <div class="col-4 d-flex justify-content-start"  data-toggle="tooltip" data-placement="top" title="Long is used to store round numbers ranging from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807">
                                                <div class="col-11 d-flex justify-content-center align-items-center p-1 blue-btn">Long</div>
                                            </div>
                                            <div class="col-4 d-flex justify-content-start"  data-toggle="tooltip" data-placement="top" title="Float is used to store floating numbers with 7 decimals digits precision">
                                                <div class="col-11 d-flex justify-content-center align-items-center p-1 blue-btn">Float</div>
                                            </div>
                                        </div>
                                        <div class="col-12 d-flex justify-content-between mt-2" style="width: 100%;">
                                            <div class="col-4 d-flex justify-content-start"  data-toggle="tooltip" data-placement="top" title="Double is used to store floating numbers with 15 decimals digits precision">
                                                <div class="col-11 d-flex justify-content-center align-items-center p-1 blue-btn">Double</div>
                                            </div>
                                            <div class="col-4 d-flex justify-content-start"  data-toggle="tooltip" data-placement="top" title="Char is used to store a single character">
                                                <div class="col-11 d-flex justify-content-center align-items-center p-1 blue-btn">Char</div>
                                            </div>
                                            <div class="col-4 d-flex justify-content-start"  data-toggle="tooltip" data-placement="top" title="String is used to store sequence of characters">
                                                <div class="col-11 d-flex justify-content-center align-items-center p-1 blue-btn">String</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>2</h1>
                            </div>
                            <!-- Tutorial Input -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Inputs</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        Create statement to prompt user to input a value <br>
                                        The inputted value must match the target variable's data type<br>
                                        <div class="mt-2">
                                            <strong>Ex:</strong> a variable with integer data type can't store the value "Hello". <br>
                                        </div>
                                        However, a variable with string data type could.
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Row 2 -->
                        <div class="col-12 d-flex mt-4">
                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>3</h1>
                            </div>
                            <!-- Tutorial Output -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Output</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        Display a value to your computer's screen. <br>
                                        Hover to buttons below to see description.
                                    </div>
                                    <div class="col-12 d-flex justify-content-between mt-2" style="width: 100%;">
                                        <div class="col-4 d-flex justify-content-start" data-toggle="tooltip" data-placement="top" title="Display a previously declared variable's value">
                                            <div class="col-11 d-flex justify-content-center align-items-center p-1 blue-btn">Variable</div>
                                        </div>
                                        <div class="col-4 d-flex justify-content-start" data-toggle="tooltip" data-placement="top" title="Display a custom text message">
                                            <div class="col-11 d-flex justify-content-center align-items-center p-1 blue-btn">Text</div>
                                        </div>
                                        <div class="col-4 d-flex justify-content-end"></div>
                                    </div>
                                    <div class="mt-2">
                                        <strong>Ex:</strong> Display the value of variable "Count" <br>
                                    </div>
                                    <img src="{{ asset('assets/output-variable.png') }}" class="img-fluid" alt=""> 

                                    <div class="mt-2">
                                        <strong>Ex:</strong> Display a "Hello World!" message<br>
                                    </div>
                                    <img src="{{ asset('assets/output-text.png') }}" class="img-fluid" alt=""> 
                                </div>
                            </div>

                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>4</h1>
                            </div>
                            <!-- Tutorial Selection -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Selection</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        Any statement located inside selection's scope will only run only if a certain condition is met. <br>
                                        Define your own condition to create a selection statement. <br>
                                        <div class="mt-2">
                                            <strong>Ex:</strong> Display a "You Passed!" message only if the value of the variable "Score" is greater than 65 <br>
                                        </div>
                                        <img src="{{ asset('assets/selection.png') }}" class="img-fluid" alt=""> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Row 3 -->
                        <div class="col-12 d-flex mt-4">
                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>5</h1>
                            </div>
                            <!-- Tutorial Repetition -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Repetition</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        Any statement located inside repetition's scope will run multiple times. <br>
                                        Define your own condition to create a repetition statement. <br>
                                        <div class="mt-2">
                                            <strong>Ex:</strong> Display a "Hello" message and add the value of variable "Count" by 1, while the value of variable "Count" is less than 5<br>
                                        </div>
                                        <img src="{{ asset('assets/repetition.png') }}" class="img-fluid" alt=""> 
                                    </div>
                                </div>
                            </div>

                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>6</h1>
                            </div>
                            <!-- Tutorial Assignment -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Assignment</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        Assign a value to a previously declared variable.<br>
                                        Hover to buttons below to see description. 
                                        <div class="col-12 d-flex justify-content-between mt-2" style="width: 100%;">
                                            <div class="col-4 d-flex justify-content-start" data-toggle="tooltip" data-placement="top" title="Assign an arithmetic operation's result to a previously declared variable">
                                                <div class="col-11 d-flex justify-content-center align-items-center p-1 blue-btn">Arithmetic</div>
                                            </div>
                                            <div class="col-4 d-flex justify-content-center" data-toggle="tooltip" data-placement="top" title="Assign a part of String or the number of character a String has to a previously declared variable">
                                                <div class="col-11 d-flex justify-content-center align-items-center p-1 blue-btn">String</div>
                                            </div>
                                            <div class="col-4 d-flex justify-content-end" data-toggle="tooltip" data-placement="top" title="Assign a value of a variable to another variable"> 
                                                <div class="col-11 d-flex justify-content-center align-items-center p-1 blue-btn">Variable</div>
                                            </div>
                                        </div>
                                        <div class="mt-2">
                                            <strong>Ex:</strong> Assign the value of variable "Score" added by 5 to variable "Score"<br>
                                        </div>
                                        <img src="{{ asset('assets/assignment.png') }}" class="img-fluid" alt=""> 
                                        <div class="mt-2">
                                            <strong>Ex:</strong> Assign the number of characters inside variable "Name" to variable "NameLength"<br>
                                        </div>
                                        <img src="{{ asset('assets/assignment-string.png') }}" class="img-fluid" alt=""> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Row 4 -->
                        <div class="col-12 d-flex mt-4">
                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>7</h1>
                            </div>
                            <!-- Tutorial Add -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Add Block of Code</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        By default, a new statement will always added to the bottom. <br>
                                        You can choose the location for new statement by using clicking the <strong>ADD</strong> button before creating a statement <br>
                                        <div class="mt-2">
                                            <strong>Ex:</strong> Output a "B" message after "A" message<br>
                                        </div>
                                        1. Click the arrow beside "A" message, and then click <strong>ADD</strong>.
                                        <img src="{{ asset('assets/first-add.png') }}" class="img-fluid" alt=""> 
                                        2. Create an output statement. The new statement will be added after "A" message.
                                        <img src="{{ asset('assets/second-add.png') }}" class="img-fluid" alt=""> 
                                    </div>
                                </div>
                            </div>

                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>8</h1>
                            </div>
                            <!-- Tutorial Delete -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Delete Block of Code</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        You can remove a previously created statement by clicking the <strong>DEL</strong> button. <br>
                                        <div class="mt-2">
                                            <strong>Ex:</strong> Delete output "B" message. <br>
                                        </div>
                                        1. Click the arrow beside "B" message, and then click <strong>DEL</strong>.
                                        <img src="{{ asset('assets/first-del.png') }}" class="img-fluid" alt=""> 
                                        End result:
                                        <img src="{{ asset('assets/second-del.png') }}" class="img-fluid" alt=""> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Row 5 -->
                        <div class="col-12 d-flex mt-4">
                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>9</h1>
                            </div>
                            <!-- Tutorial Move -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Move Block of Code</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        You can move a previously created statement to another location. <br>
                                        <div class="mt-2">
                                            <strong>Ex:</strong> Move "You Passed!" message inside selection statement<br>
                                        </div>
                                        1. Click the arrow beside "You Passed!" message, and then click <strong>MOV</strong>.
                                        <img src="{{ asset('assets/first-move.png') }}" class="img-fluid" alt="">
                                        2. Click the arrow inside selection statement, and then click <strong>PST</strong>.
                                        <img src="{{ asset('assets/second-move.png') }}" class="img-fluid" alt="">
                                        End result:
                                        <img src="{{ asset('assets/third-move.png') }}" class="img-fluid" alt=""> 
                                    </div>
                                </div>
                            </div>

                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>10</h1>
                            </div>
                            <!-- Tutorial Copy -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Copy Block of Code</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        You can duplicate a previously created statement to a target location. <br>
                                        <div class="mt-2">
                                            <strong>Ex:</strong> Duplicate "You Passed!" message, and place it inside selection statement<br>
                                        </div>
                                        1. Click the arrow beside "You Passed!" message, and then click <strong>CPY</strong>.
                                        <img src="{{ asset('assets/first-move.png') }}" class="img-fluid" alt="">
                                        2. Click the arrow inside selection statement, and then click <strong>PST</strong>.
                                        <img src="{{ asset('assets/second-move.png') }}" class="img-fluid" alt="">
                                        End result:
                                        <img src="{{ asset('assets/duplicate.png') }}" class="img-fluid" alt=""> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>