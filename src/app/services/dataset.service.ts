import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Dataset, DColumn} from '../models/models';
import {BaseService} from './base.service'
import myGlobals = require('../models/globals');

function replacer(key, value) {
  console.debug(key)  
  // Filtering out properties
  if (key === "types") {
    return undefined;
  }
  return value;
}

@Injectable()
export class DatasetService extends BaseService<Dataset>{
    dsets:Array<Dataset> 
    columns: Array<DColumn>
    constructor(public http: Http) {
        super(http,myGlobals.parallelmlSite+"api/v1/customers/"+myGlobals.customerid+"/datasets")
        let col1 = new DColumn(1,1,'col1',"String",false);
        let col2 = new DColumn(2,1,'col2',"Int",true);
        this.columns = new Array<DColumn>();
        this.columns.push(col1)
        this.columns.push(col2)

        // array of data sets
        this.dsets = new Array<Dataset>()
        let dset1 = new Dataset(1,1,'Document1' ,"test.csv")      
        dset1.setCols(this.columns)
        this.dsets.push(dset1)


    }
 
    public getDatasets(): Observable<Dataset[]> {
        return this.http.get(this.srvUrl)
                    .map(r=>this.toDatasets(r.json()))
                    .catch(this.handleError);          

    }

   public saveDataset(s:Dataset,payload:FormData) : Observable<Dataset> {
        
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        
        s.cid=100
        s.name="test dataset"
        s.path="C:\test"
        let body = JSON.stringify(s,replacer);
        console.debug("save dataset" + body)
        
        payload.append("final_dataset", body)
        return this.http.post(this.srvUrl, payload,options)
                    .map((res:Response) => res.json())
                    .catch(this.handleError);
    }

   public analyze(s:Dataset,payload:FormData) : Observable<Dataset> {
        console.debug("analyze dataset")
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(s);
        console.debug("analyze " + body)
        payload.append("dataset", body)
        return this.http.post(this.srvUrl+"/analyze", payload,options)
                    .map(r=>this.toDataset(r.json()))
                    .catch(this.handleError);
   }

  public mapDataset(response:Response): Dataset{
       return response.json().results.map(this.toDataset)
  }


  public toDataset(r:any): Dataset{
        console.debug("toDataset" )
        let dataset = <Dataset>({
            id: r.id,
            columns:this.mapColumns(r)
        });
        console.log('Parsed dataset:', dataset);
        return dataset;
  }

  public toDatasets(r:any): Array<Dataset>{
        console.debug("toDataset" )
        let result = new Array<Dataset>()
        for (let d of r) {
            let dataset = <Dataset>({
                id: d.id,
                name:d.name,
                path:d.path,
            });
            result.push(dataset)  
            
        }
        console.log('Parsed dataset:', result);
        return result;
  }


  public mapColumns(r:any): Array<DColumn>{
        let result = new Array<DColumn>();
        for (let c of r.columns) {
            let newCol = new DColumn(c.id,c.dasetid,c.name,c.type,c.ignore);
            console.debug("new col " + newCol.name )
            result.push(newCol);
        }
        return result;
  }
    





}