import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { CustomerTable, ContactsInterface } from '../interfaces';


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
        return this.http.get<CustomerTable[]>(`${this.DEV_URL}/companies`)
    }

    addCompaniesDetails = (reqData : any) =>{
        let data = JSON.stringify(reqData)
        return this.http.post<any>(`${this.DEV_URL}/companies/create`,data,this.httpOptions);
    }

    saveNewContact = (reqData: any) => {
     return this.http.post<any>(`${this.DEV_URL}/contacts/create`,reqData,this.httpOptions);
    }

    getAllContacts = () => {
        return this.http.get<ContactsInterface[]>(`${this.DEV_URL}/contacts`);
    }

    createQuotation = (reqData :any) => {
        return this.http.post<any>(`${this.DEV_URL}/qotation/create`,reqData,this.httpOptions);
    }

    getCompaniesList = () => {
        return this.http.get<any>(`${this.DEV_URL}/companies/list`);
    }

    getAllQuotations = () => {
        return this.http.get<any>(`${this.DEV_URL}/quotation/get`);
    }

    getAllQuotationsList = () => {
        return this.http.get<any>(`${this.DEV_URL}/quotation/list`);
    }
    
}