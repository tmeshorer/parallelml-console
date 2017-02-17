import { Component,ViewChild,EventEmitter,Output,Input,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { StudyService} from "../../services/study.service"
import { DatasetService} from "../../services/dataset.service"
import { Study,Dataset,SColumn} from "../../models/models"
import { Observable} from "rxjs"


@Component({
    selector: 'study-editor',
    templateUrl: 'study-editor.component.html',
})

export class StudyEditorComponent implements OnInit,OnDestroy{
  public  model          :Study
  public  datasets       :Array<Dataset>
  public  selectedDataset:Dataset
  public  columns        :Array<SColumn>
  private sub            :any
  private editing:boolean = false;

  constructor(
      private dsrv:DatasetService,
      private srv:StudyService,
      private rtr:Router,
      private route:ActivatedRoute) {
  }
  

  onSubmit(): void {
        console.debug("onSubmit")
        let op:Observable<Study>;
        if(!this.editing){
            // Create a new comment
            op = this.srv.saveStudy(this.model)
        } else {
            // Update an existing comment
            op = this.srv.update(this.model)
        }
        op.subscribe(
                data => this.navigateBack(),
                err => console.log(err)
        );
      
  }

  navigateBack() {
      console.debug("navigate back")
      this.rtr.navigate(["studies"])
  }

  fetchDatasets() {
    this.dsrv.getDatasets().subscribe(
                     datasets => this.initDatasets(datasets),
                     err => { console.error('Error: ' + err); });     
  }

  initDatasets(sets:Array<Dataset>) {
      console.debug("init Datasets")
      this.datasets = sets;
      if (sets.length>0) {
           this.selectedDataset = sets[0];
           console.debug(JSON.stringify(this.selectedDataset))
           this.fetchDetails(this.selectedDataset);         
        }
  }

  // Fetch the dataset columns, and convert them to s columns
  fetchDetails(d:Dataset) {
    this.dsrv.find(d.id).subscribe(
                     dataset => this.initSelection(dataset),
                     err => { console.error('Error: ' + err); });     
      
  }

  initSelection(d:Dataset) {
      console.debug("init Selection")
      console.debug(JSON.stringify(d.columns))
      
      this.selectedDataset = d;
      var c1 = new SColumn(0,0,0,"age","string",0)
      var c2 = new SColumn(1,0,0,"salary","Number",1)
      this.model.columns.push(c1)
      this.model.columns.push(c2)

      console.debug(JSON.stringify(this.model))
           
      /*
      for (var item of  d.columns) {
          console.debug(JSON.stringify(item))
          var c = new SColumn(0,0,item.id,item.name,false,false)
          this.columns.push(c)
      } 
      */

  }

  // Load data ones componet is ready
  ngOnInit() {
      console.debug("onInit")
      // Subscribe to route params
      this.sub = this.route.params.subscribe(params => {
        let id = params['id'];
        if (id == 0) {
            console.debug("New study")
            this.editing = false
            this.model =new Study(0,"");  
            this.fetchDatasets()
            // get the first one
            
        }
        else {
            console.debug("Update study")
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

  
}
