import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from "./base.service"
import {Customer} from "../models/models"


@Injectable()
export class CustomerService extends BaseService<Customer>{
    
    constructor(public http: Http) {
        super(http,"/customers")
    }
   
}