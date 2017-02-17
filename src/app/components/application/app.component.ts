import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth} from '../../services/auth.service'


@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    providers:[Auth]
})
export class AppComponent {
    constructor(private router: Router,private auth: Auth) {
    }
}
