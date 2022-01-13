<div class="accordion" id="accordionProject">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseProjects" aria-expanded="true" aria-controls="collapseTemplate" style="background-color: #00A9E2; color: white">
                Manage Projects
            </button>
        </h2>
        <div id="collapseProjects" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="container-fluid">
                    <div id="pjMessageContainer"></div>
                    <!-- Projects -->
                    <div class="col-12">
                        <div class="col-12" style="color: black">
                            <strong>Create New Project</strong>
                        </div>
                        <div class="col-12 d-flex justify-content-between mt-2" style="width: 100%;">
                            <!-- <form action="" method="post" class="col-12 d-flex"> -->
                                <div class="col-10 d-flex justify-content-start">
                                    <input type="text" name="project_name" class="form-control" placeholder="Project Name">
                                </div>
                                <div class="col-2 d-flex justify-content-end">
                                    <button type="submit" id="create-project" class="btn btn-primary">Create</button>
                                </div>
                            <!-- </form> -->
                        </div>
                    </div>
                    <div class="col-12 mt-4" style="color: black">
                        <strong>My Projects</strong>
                    </div>
                    <div class="col-12 d-flex justify-content-between mt-2 overflow-auto border border-primary" style="width: 100%; max-height: 200px;">
                        <div class="col-12 d-flex justify-content-start flex-column" style="min-height: 300px">
                            <table class="table m-0 col-12 col-sm-12">
                                <tbody class="col-12 col-sm-12 project-list-container">
                                    @foreach($projects as $project)
                                    <tr class="col-12 col-sm-12 d-flex project-container-{{ $project->project_id }}">
                                        <td class="col-8 col-sm-8 d-flex align-items-center">{{ $project->project_name }}</td>
                                        <td class="col-4 col-sm-4 d-flex justify-content-evenly">
                                            <button class="btn btn-success btn-sm rounded-1 col-3 col-sm-3" type="button" data-toggle="tooltip" data-placement="top" title="Load" id="load-project" data-value="{{ $project->project_id }}"><i class="fa fa-file-download"></i></button>
                                            <button class="btn btn-primary btn-sm rounded-1 col-3 col-sm-3" type="button" data-toggle="tooltip" data-placement="top" title="Save" id="save-project" data-value="{{ $project->project_id }}"><i class="fa fa-save"></i></button>
                                            <button class="btn btn-danger btn-sm rounded-1 col-3 col-sm-3 delete-project" type="button" data-toggle="tooltip" data-placement="top" title="Delete" data-bs-toggle="modal" data-bs-target="#delete-modal" data-value="{{ $project->project_id }}"><i class="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>