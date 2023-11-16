import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';


export interface customerTable {
    name : string;
    contactPerson: string;
    location: string;
    currency: string;
    email: string;
    createdAt: string;
  }



@Injectable()

export class AppService {
    constructor(  private http : HttpClient ){}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      config = { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    getAllCompanies = () =>{
        console.log("===== get all compaies")
        return this.http.get<customerTable[]>('https://crm-backend-oebb.onrender.com/companies')
    }

    AddCompaniesDetails = (reqData : any) =>{
        let data = JSON.stringify(reqData)
        console.log("======== reqData",reqData)
        return this.http.post<any>('https://crm-backend-oebb.onrender.com/companies/create',data,this.httpOptions);
    }
    
}