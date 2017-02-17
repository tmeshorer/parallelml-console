import { Component } from "@angular/core";
import { StudyService} from "../../services/study.service"
import { Study} from "../../models/models"
import { Router } from "@angular/router";
import { StudyEditorComponent} from "./study-editor.component"
import { Observable } from 'rxjs';


@Component({
    selector: 'study-list',
    templateUrl: 'study-list.component.html'
})
export class StudyListComponent  {
    model:Study[]
    
    constructor(
        private srv:StudyService,
        private rtr:Router) {
    }

    ngOnInit() {
        console.log("ngOnInit")
        this.srv.getStudies().subscribe(
            res => this.model = res),
            error => console.error('Error: ' + error),
            () => console.log('Completed!');
    }

    onDetails(id:number) {
        this.rtr.navigate(['studies/detail/', id]);
    }

    onDelete(id:number) {
        this.srv.delete(id)
        this.model.forEach((t, i) => {
                if (t.id === id) { this.model.splice(i, 1); }
        });
    }

    onNew() {
        console.log("DatasetsComponent::onNew")
        this.rtr.navigate(['studies/detail/', 0]);
    }


    onReport(id:number) {
        console.log("StudysComponent::onReport " + id)
    }

}
