<div class="accordion" id="accordionTemplates">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBlockCode" aria-expanded="true" aria-controls="collapseTemplate" style="background-color: #00A9E2; color: white">
                Block of Code
            </button>
        </h2>
        <div id="collapseBlockCode" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="container-fluid">
                    <!-- Error container -->
                    <div id="bcErrorContainer">
                        
                    </div>

                    <!-- Block of Code -->
                    <div class="col-sm-12 p-2">
                        <div class="col-sm-12" id="block-code-container" style="overflow: auto">
                            <canvas id="block-code-canvas"></canvas>
                        </div>
                    </div>
                    
                    <!-- Generate  -->
                    <div class="col-12 col-sm-12 d-flex justify-content-end p-2">
                        <div class="col-4 col-sm-4 d-flex justify-content-between">
                            <div class="col-1 col-sm-1"></div>
                            <div class="col-5 col-sm-5 d-flex justify-content-end align-items-center">
                                <select name="" class="form-select" id="">
                                    <option value="">C</option>
                                    <option value="">C++</option>
                                    <option value="">C#</option>
                                    <option value="">Java</option>
                                    <option value="">Python</option>
                                    <option value="">Pseudocode</option>
                                </select>
                            </div>
                            <div class="col-1 col-sm-1"></div>
                            <div class="col-4 col-sm-4 d-flex justify-content-end align-items-center">
                                <button type="submit" class="btn btn-primary col-12 col-sm-12" id="btn-generate-source-code">Generate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>