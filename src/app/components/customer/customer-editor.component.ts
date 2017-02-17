import { Component,ViewChild,EventEmitter,Output} from '@angular/core';
import { Router } from "@angular/router";
import {Wizard} from "clarity-angular";

import { CustomerService} from "../../services/customer.service";
import { Customer} from "../../models/models";

@Component({
    selector: 'add-customer',
    templateUrl: 'newparty.component.html',

})

export class CustomerEditorComponent {
  public model:Customer;
  
  constructor(
      private service:CustomerService,
      private router:Router) {
  }

  private addCustomer(){
    
    //this.service.addCustomer(model,this.uploadPayload).subscribe(
    //            data => this.onNewPartyOutput.next(model),
    //            err => console.log(err)
     //       );
  }

  
}
