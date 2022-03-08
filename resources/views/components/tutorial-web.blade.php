<div class="accordion" id="accordionTutorialWebCompiler">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTutorialWeb" aria-expanded="true" aria-controls="collapseTutorialBlock" style="background-color: #00A9E2; color: white">
                Tutorial: Web Compiler
            </button>
        </h2>
        <!-- 
        -Create file
        -Save File
        -Open File
        -Debug File
        -Change Settings
        -Compile -->
        <div id="collapseTutorialWeb" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="container-fluid">
                    <div class="col-12">
                        <!-- Row 1  -->
                        <div class="col-12 d-flex">
                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>1</h1>
                            </div>
                            <!-- Tutorial Settings -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>The Settings Tab</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        Change programming language and customize your text editor. <br>
                                        To access settings, click on the <strong>Setting</strong> tab.
                                    </div>
                                    <img src="{{ asset('assets/settings.png') }}" class="img-fluid" alt=""> 
                                </div>
                            </div>
                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>2</h1>
                            </div>
                            <!-- Tutorial Create -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Create File</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        Create a new file to start writing source code. <br>
                                    </div>
                                    To create a file, click on the <strong>Plus</strong> icon.
                                    <img src="{{ asset('assets/create.png') }}" class="img-fluid" alt=""> 
                                </div>
                            </div>
                            
                        </div>
                        
                        <!-- Row 2 -->
                        <div class="col-12 d-flex mt-4">
                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>3</h1>
                            </div>
                            <!-- Tutorial Save -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Save File</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        Save your progress.<br>
                                        Manage your files using directories within our file system. <br>
                                        
                                        <div class="mt-2"></div>
                                        1. Click on the <strong>Save</strong> icon.
                                        <img src="{{ asset('assets/first-save.png') }}" class="img-fluid" alt=""> 
                                        <div class="mt-2"></div>
                                        2. Choose a target directory, or create a new directory.
                                        <img src="{{ asset('assets/second-save.png') }}" class="img-fluid" alt="">
                                        <div class="mt-2"></div>
                                        3. Name your file.
                                        <img src="{{ asset('assets/third-save.png') }}" class="img-fluid" alt="">
                                    </div>
                                </div>
                            </div>

                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>4</h1>
                            </div>
                            <!-- Tutorial Open -->
                            <div class="col-5 d-flex">
                                <div class="col-11 p-1 border border-1 rounded bg-light">
                                    <div class="col-12" style="color: black">
                                        <strong>Open File</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        Continue your progress. <br>
                                        Locate and open your previously saved file. <br>

                                        <div class="mt-2"></div>
                                        1. Click on the <strong>Folder</strong> icon to browse directories.
                                        <img src="{{ asset('assets/open.png') }}" class="img-fluid" alt=""> 
                                        <div class="mt-2"></div>
                                        2. Choose a directory.
                                        <img src="{{ asset('assets/directory.png') }}" class="img-fluid" alt="">
                                        <div class="mt-2"></div>
                                        3. Locate your file within directory.
                                        <img src="{{ asset('assets/file.png') }}" class="img-fluid" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Row 3 -->
                        <div class="col-12 d-flex mt-4">
                            <div class="col-1 d-flex justify-content-end pe-4">
                                <h1>5</h1>
                            </div>
                            <!-- Tutorial Compile -->
                            <div class="col-5">
                                <div class="col-12 d-flex">
                                    <div class="col-11 p-1 border border-1 rounded bg-light">
                                        <div class="col-12" style="color: black">
                                            <strong>Compile</strong>
                                        </div>
                                        <div class="col-12 mt-1">
                                            Show the output produced from your source code. <br>
                                        </div>
                                        To compile, click on the <strong>Play</strong> icon.
                                        <img src="{{ asset('assets/compile.png') }}" class="img-fluid" alt=""> 
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
                                        <strong>Debug File</strong>
                                    </div>
                                    <div class="col-12 mt-1">
                                        Output the value of a selected variable, on a certain line of code.<br>
                                        <div class="mt-2">
                                            <strong>Ex:</strong> Suppose we want to see the value of <strong>score</strong> variable on the 6th line of code<br>
                                        </div>
                                        <img src="{{ asset('assets/first-debug.png') }}" class="img-fluid" alt=""> 
                                        <div class="mt-2"></div>
                                        1. On the <strong>Input</strong> tab, click on <strong>Add Debug Variable</strong> button. A form will appear.
                                        <div class="mt-2"></div>
                                        <img src="{{ asset('assets/second-debug.png') }}" class="img-fluid" alt=""> 
                                        2. Fill the <strong>Var</strong> with your selected variable name. <br>
                                        3. Choose a matching <strong>Data Type</strong> as your selected variable. <br>
                                        4. <strong>Break Line</strong> determines your selected line of code. <br>
                                        5. Click on <strong>Start Debug</strong> button, and the result will be shown at the <strong>Value </strong> field.
                                        <img src="{{ asset('assets/third-debug.png') }}" class="img-fluid" alt=""> 
                                        6. Click on <strong>Stop Debug</strong> to finish.
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