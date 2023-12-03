import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { CustomerTable } from '../interfaces';


@Injectable()

export class AppService {
    constructor(  private http : HttpClient ){}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      config = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

      DEV_URL = 'http://localhost:3000';
      PRD_URL = 'https://crm-backend-oebb.onrender.com'
    getAllCompanies = () =>{
        return this.http.get<CustomerTable[]>(`${this.PRD_URL}/companies`)
    }

    AddCompaniesDetails = (reqData : any) =>{
        let data = JSON.stringify(reqData)
        return this.http.post<any>(`${this.PRD_URL}/companies/create`,data,this.httpOptions);
    }
    
}