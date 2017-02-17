import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

export interface Entity {
     id:number;
}

export class BaseService<T extends Entity> {
    public errorMessage:string;
  
    public headers:Headers;
    public options:RequestOptions;    

    constructor(public http: Http,public srvUrl:string) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    protected defaultOptions() {
        return this.options;
    } 

    public extractData(res: Response) {
        if (res == null) return {}
        let body = res.json();
        return body.data || {};
    }

     public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

    public find(id:number) : Observable<T> {
        return this.http.get(this.srvUrl+"/"+id)
                   .map(response => <T>response.json())
                   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public add(o:T) : Observable<T> {
        let body = JSON.stringify(o);
        return this.http.post(this.srvUrl, body, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    public getAll() : Observable<T[]> {
        return this.http.get(this.srvUrl)
                   .map(response => <T[]>response.json())
                   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }   
   
    public update(s:T) : Observable<T>{
        return this.http.put(this.srvUrl +"/"+s.id, { s }, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    public delete(id:number) {
        this.http.delete(this.srvUrl+"/"+id, this.options).
                    subscribe((ok)=>{console.log(ok)});
    }

    getOptions():RequestOptions {
        return this.options
    }

}