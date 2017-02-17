import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from "./base.service"
import {Pipeline} from "../models/models"


@Injectable()
export class PipelineService extends BaseService<Pipeline>{
    
    constructor(public http: Http) {
        super(http,"/pipelines")
    }
   
}
