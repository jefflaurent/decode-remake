<div class="accordion mt-4" id="accordionProgramInput">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button id="command-name" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInput" aria-expanded="true" aria-controls="collapseInput" style="background-color: #00A9E2; color: white">
                Program Input
            </button>
        </h2>
        <div id="collapseInput" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <!-- Templates -->
                <div class="container-fluid">
                    <div id="pcInputErrorContainer"></div>
                    <div id="pcInputContainer">
                        <div class="loop-container p-2 border border-1 rounded bg-light mb-3">
                            <div class="col-sm-12 mb-3">
                                <strong>Loop Condition</strong>
                            </div>
                            <div class="col-sm-12 d-flex align-items-center mb-3">
                                <div class="col-5"><strong>Variable</strong></div>
                                <div class="col-7">
                                    <select name="" id="" class="form-select">
                                        <option value="">Choose Variable</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12 d-flex align-items-center mb-3">
                                <div class="col-sm-5"><strong>Operator</strong></div>
                                <div class="col-sm-7 d-flex justify-content-center align-items-center">
                                    <div class="col-sm-2 d-flex justify-content-evenly align-items-center"><input type="radio" name="a" id="">==</div>
                                    <div class="col-sm-2 d-flex justify-content-evenly align-items-center"><input type="radio" name="a" id="">!=</div>
                                    <div class="col-sm-2 d-flex justify-content-evenly align-items-center"><input type="radio" name="a" id=""><</div>
                                    <div class="col-sm-2 d-flex justify-content-evenly align-items-center"><input type="radio" name="a" id="">></div>
                                    <div class="col-sm-2 d-flex justify-content-evenly align-items-center"><input type="radio" name="a" id=""><=</div>
                                    <div class="col-sm-2 d-flex justify-content-evenly align-items-center"><input type="radio" name="a" id="">>=</div>
                                </div>
                            </div>
                            <div class="col-sm-12 d-flex align-items-center mb-3">
                                <div class="col-5"><strong>Value Type</strong></div>
                                <div class="col-7">
                                    <select name="" id="" class="form-select">
                                        <option value="">Variable</option>
                                        <option value="">Custom Value</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12 d-flex align-items-center mb-3">
                                <div class="col-sm-5"><strong>Value</strong></div>
                                <div class="col-sm-7">
                                    <select name="" id="" class="form-select">
                                        <option value="">Choose Variable</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="loop-container p-2 border border-1 rounded bg-light mb-3">
                            <div class="col-sm-12 mb-3">
                                <strong>Variable Update</strong>
                            </div>
                            <div class="col-sm-12 d-flex align-items-center mb-3">
                                <div class="col-sm-5"><strong>Update Type</strong></div>
                                <div class="col-sm-7 d-flex justify-content-center align-items-center">
                                    <div class="col-sm-4 d-flex justify-content-evenly align-items-center"><input type="radio" name="x" id="">Increment</div>
                                    <div class="col-sm-1 d-flex justify-content-evenly align-items-center"></div>
                                    <div class="col-sm-4 d-flex justify-content-evenly align-items-center"><input type="radio" name="x" id="">Decrement</div>
                                    <div class="col-sm-3 d-flex justify-content-evenly align-items-center"></div>
                                </div>
                            </div>
                            <div class="col-sm-12 d-flex align-items-center mb-3">
                                <div class="col-sm-5"><strong>Update Value</strong></div>
                                <div class="col-sm-7">
                                    <input type="number" name="" class="form-control" id="">
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-sm-10"></div>
                            <div class="col-sm-2 d-flex justify-content-end"><button type="submit" class="btn btn-primary">Create</button></div>
                        </div>
                    </div>
                    <div id="pcInputContainerLower" class="d-flex justify-content-between"></div>
                </div>
            </div>
        </div>
    </div>
</div>