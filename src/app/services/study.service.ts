import {Injectable} from '@angular/core';
import {BaseService} from "./base.service"
import {Study,SColumn} from "../models/models"
import {Observable} from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
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
export class StudyService extends BaseService<Study>{
    
    constructor(public http: Http) {
        super(http,myGlobals.parallelmlSite+"api/v1/customers/"+myGlobals.customerid+"/studies")
    }

    public getStudies(): Observable<Study[]> {
        return this.http.get(this.srvUrl)
                    .map(r=>this.toStudies(r.json()))
                    .catch(this.handleError);          

    }
    
   public saveStudy(s:Study) : Observable<Study> {
        s.cid=100
        let body = JSON.stringify(s);
        console.debug("save study" + body)
        
        return this.http.post(this.srvUrl, body,super.defaultOptions())
                    .map((res:Response) => res.json())
                    .catch(this.handleError);
    }

    public toStudy(r:any): Study{
        console.debug("toDataset" )
        let dataset = <Study>({
            id: r.id,
            columns:this.mapColumns(r)
        });
        console.log('Parsed dataset:', dataset);
        return dataset;
  }

  public toStudies(r:any): Array<Study>{
        console.debug("to study" )
        let result = new Array<Study>()
        for (let d of r) {
            let s = <Study>({
                id: d.id,
                uuid:d.uuid
            });
            result.push(s)  
            
        }
        console.log('Parsed study:', result);
        return result;
  }


  public mapColumns(r:Study): Array<SColumn>{
        let result = new Array<SColumn>();
        for (let c of r.columns) {
            let newCol = new SColumn(c.id,c.studyid,c.dcolumnid,c.name,c.dt,c.role);
            console.debug("new col " + newCol.name )
            result.push(newCol);
        }
        return result;
  }

   
}
