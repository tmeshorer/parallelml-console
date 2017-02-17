import { Component,ViewChild,EventEmitter,Output,Input,OnInit,OnDestroy} from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { DatasetService } from "../../services/dataset.service";
import { Dataset,DColumn  } from "../../models/models";
import { Observable} from "rxjs"

@Component({
    selector: 'dataset-editor',
    templateUrl: 'dataset-editor.component.html',
})

export class DatasetEditorComponent implements OnInit, OnDestroy{
  private sub:any
  private model:Dataset  
  private editing = false;
  private file:File;
  private uploadPayload: FormData;  
  
  constructor(
      private srv:DatasetService,
      private route:ActivatedRoute) 
  {
  }

  onAnalyze():void {
        console.debug("onAnalyze")
       this.srv.analyze(this.model,this.uploadPayload).
       subscribe(
                data => this.model = data,
                err => console.log(err)
        );
  }

  onSubmit(): void {
        console.debug("onSubmit")
        let op:Observable<Dataset>;
        if(!this.editing){
            // Create a new comment
            op = this.srv.saveDataset(this.model,this.uploadPayload)
        } else {
            // Update an existing comment
            op = this.srv.update(this.model)
        }
        op.subscribe(
                data => this.model = data,
                err => console.log(err)
        );
      
  }

  // Load data ones componet is ready
  ngOnInit() {
      console.debug("onInit")
      // Subscribe to route params
      this.sub = this.route.params.subscribe(params => {
        let id = params['id'];
        if (id == 0) {
            this.editing = false
            this.model = new Dataset(0,0,"","")
        }
        else {
            this.editing=true
            this.srv.find(id).subscribe(
                data => this.model = data,
                err => console.log(err)
        );
        }
    });
  }

  ngOnDestroy() {
      // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

  
  public onUpload(event) {
    this.file = event.srcElement.files[0];
    this.uploadPayload  = new FormData();
    this.uploadPayload.append('file', this.file,this.file.name);
  }

}


