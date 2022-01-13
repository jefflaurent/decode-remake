<div class="accordion" id="accordionTemplates">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSourceCode" aria-expanded="true" aria-controls="collapseTemplate" style="background-color: #00A9E2; color: white">
                Source Code
            </button>
        </h2>
        <div id="collapseSourceCode" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="container-fluid">
                    <div class="col-sm-12 col-12">
                        <!-- Error Messages -->
                        <div class="col-12 col-sm-12 p-2" id="resultErrorContainer"></div>

                        <!-- Source Code -->
                        <div class="col-sm-12 col-12 p-2">
                            <textarea class="col-sm-12 col-12"  id="source-code-container" rows="30" readonly>
                            </textarea>
                        </div>

                        <!-- Font size config and Download  -->
                        <div class="row p-2 mt-1">
                            <div class="col-12 col-sm-12 d-flex justify-content-end">
                                <div class="col-9 col-sm-9 col-xl-9 d-flex justify-content-evenly align-items-center">
                                    <div class="col-3 col-sm-8 col-xl-9"></div>
                                    <div class="col-3 col-sm-1 col-xl-1 d-flex justify-content-center">
                                        <i class="fas fa-minus change-font-size col-12 col-sm-12 d-flex justify-content-center" data-value="minus"></i>
                                    </div>
                                    <div class="col-3 col-sm-2 col-xl-1">
                                        <input type="text" name="" id="font-size-input" class="form-control text-center col-sm-12 col-12" value="14" maxlength="2">
                                    </div>
                                    <div class="col-3 col-sm-1 col-xl-1 d-flex justify-content-center">
                                        <i class="fas fa-plus change-font-size col-12 col-sm-12 d-flex justify-content-center" data-value="plus"></i>
                                    </div>
                                </div>
                                <div class="col-0 col-sm-1 col-xl-1"></div>
                                <div class="d-flex justify-content-end align-items-center col-3 col-sm-2 col-xl-2">
                                    <button type="submit" class="btn btn-primary col-12 col-sm-12 d-flex justify-content-center align-items-center" id="download-source-code">Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>