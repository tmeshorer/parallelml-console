import { Component,Input,OnInit} from "@angular/core";
import { Routes} from "@angular/router";

import { DatasetColumnService,DatasetColumn} from "../../services/datasetcolumn.service"
import { Router } from "@angular/router";
import {DatasetColumnEditorComponent} from "./datasetcolumn-editor.component"
import { Observable } from 'rxjs';


@Component({
    templateUrl: 'datasetcolumn-list.component.html',
})


export class DatasetColumnListComponent implements OnInit  {

    // local properties
    datasetcolumns:DatasetColumn[]
    // input properties
    @Input() listId:string;
    @Input() editId:string;


    loadDatasetColumns() {
        this.service.getDatasetColumns()
                 .subscribe(
                     datasetcolumns => this.datasetcolumns = datasetcolumns,
                     err => {
                         console.error('Error: ' + err);
                     });
    }

    constructor(private service:DatasetColumnService,
                private router:Router) {
        console.log("datasetcolumns ctor")
    }

    ngOnInit() {
        this.loadDatasetColumns()
    }


    onDetails(id:number) {
        console.log("DatasetColumnsComponent::onDetails " + id)
    }



}
