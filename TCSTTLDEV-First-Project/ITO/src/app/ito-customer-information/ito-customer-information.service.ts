import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Http ,Response } from '@angular/http';

@Injectable()
export class ITOcustInfoService{
    private _quotUrl:string="http://10.0.0.4:8082/ITO/quot/quotHome";
    private _CustomerDetails:string="http://10.0.0.4:8082/ITO/quot/navigateBasicDetails";

    customerID:number;
    custName:string;
    hasConsultant:string;
    firmId:number;
    spocId:number;
    enableEndUser:boolean;
    enableCR:boolean;
    enableCust:boolean;
    constructor(private _http:Http){
    
    }
    getQuotationList(): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            return this._http.post(this._quotUrl,' ', options).map(this.extractData);
    }
    submitCusomerDetails(res): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            return this._http.post(this._CustomerDetails, res , options).map(this.extractData);
    }
        private extractData(res: Response) {
            let body=res.json();
            // console.log(body);
             return body || {};
        }
}