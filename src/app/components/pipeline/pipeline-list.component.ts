import { Component } from "@angular/core";
import { PipelineService} from "../../services/pipeline.service"
import { Pipeline} from "../../models/models"
import { Router } from "@angular/router";
import { Observable } from 'rxjs';


@Component({
    selector: 'dataset-list',
    templateUrl: 'pipeline-list.component.html',
})
export class PipelineListComponent  {
    model:Pipeline[]
    rtr  :Router
    srv  :PipelineService
    showNew:boolean = false

    constructor(pipelineService:PipelineService,routerService:Router) {
        this.rtr = routerService
        this.srv = pipelineService
        console.log("pipelines ctor")
    }

    ngOnInit() {
        console.log("ngOnInit")
        this.srv.getAll().subscribe(
            res => this.model = res),
            error => console.error('Error: ' + error),
            () => console.log('Completed!');
    }

    onDelete(id:number) {
        console.log("PipelinesComponent::onDelete" + id)
        this.srv.delete(id)
        this.model.forEach((t, i) => {
                if (t.id === id) { this.model.splice(i, 1); }
        });
    }
}
