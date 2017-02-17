import { Component,Input,OnInit} from "@angular/core";
import { Routes} from "@angular/router";
import { DatasetService } from "../../services/dataset.service";
import { Dataset  } from "../../models/models";
import { Router } from "@angular/router";
import {DatasetEditorComponent} from "./dataset-editor.component"
import { Observable } from 'rxjs';


@Component({
     selector: 'dataset-list',
     templateUrl: 'dataset-list.component.html',
})


export class DatasetListComponent implements OnInit  {
    model:Dataset[]

    constructor(private srv:DatasetService,
                private rtr:Router) {
            console.log("datasets ctor")
    }

    ngOnInit() {
            this.srv.getDatasets().subscribe(
                     datasets => this.model = datasets,
                     err => { console.error('Error: ' + err); });
    }

    onReport(id:number) {
        // get the report from the server
        console.log("DatasetsComponent::onReport " + id)
    }

    onDetails(id:number) {
        this.rtr.navigate(['/datasets/detail/', id]);
    }

    onDelete(id:number) {
        console.log("DatasetsComponent::onDelete" + id)
        this.srv.delete(id)
        this.model.forEach((t, i) => {
                if (t.id === id) { this.model.splice(i, 1); }
        });
    }

    onNewStudy(id:number) {
        console.log("new study")
        this.rtr.navigate(['/datasets/detail/'+id+'/studies/new']);
    }

    onNew() {
        console.log("DatasetsComponent::onNew")
        this.rtr.navigate(['/datasets/detail/', 0]);
    }

    onNewDataset(s:Dataset) {
        this.model.push(s)
    }
}
