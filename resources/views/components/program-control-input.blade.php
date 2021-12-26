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
                        <div class="row">
                            <div class="col-4">
                                <div class="list-group" id="list-tab" role="tablist">
                                    <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home">If</a>
                                    <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" >Ascii Code</a>
                                    <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages">Escape Sequence</a>
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="tab-content" id="nav-tabContent">
                                    <div class="tab-pane fade show active" id="list-home" role="tabpanel">
                                        <strong>Input Text</strong>
                                        <input type="text" class="form-control mt-2" name="" id="">
                                        <div class="col-sm-12 d-flex">
                                            <div class="col-sm-8 d-flex align-items-center">
                                                <div>
                                                    <input type="checkbox" class="form-check-input" id="flexCheckChecked"> 
                                                    <label class="form-check-label" for="flexCheckChecked">
                                                        Add new line
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 d-flex justify-content-end">
                                                <button type="submit" class="btn btn-primary mt-2">Add Text</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="list-profile" role="tabpanel">
                                        <strong>ASCII Code</strong>
                                        <select name="" id="" class="form-select mt-2">
                                            <option value="">1</option>
                                            <option value="">2</option>
                                            <option value="">3</option>
                                        </select>
                                        <div class="col-sm-12 d-flex">
                                            <div class="col-sm-8"></div>
                                            <div class="col-sm-4 d-flex justify-content-end">
                                                <button type="submit" class="btn btn-primary mt-2">Add Text</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="list-messages" role="tabpanel">
                                        <strong>Escape Sequence</strong>
                                        <select name="" id="" class="form-select mt-2">
                                            <option value="">\a</option>
                                            <option value="">\b</option>
                                            <option value="">\f</option>
                                            <option value="">\n</option>
                                            <option value="">\r</option>
                                            <option value="">\v</option>
                                        </select>
                                        <div class="col-sm-12 d-flex">
                                            <div class="col-sm-8"></div>
                                            <div class="col-sm-4 d-flex justify-content-end">
                                                <button type="submit" class="btn btn-primary mt-2">Add Text</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="pcInputContainerLower" class="d-flex justify-content-between"></div>
                </div>
            </div>
        </div>
    </div>
</div>