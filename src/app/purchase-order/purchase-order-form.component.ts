import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PurchaseOrder } from '../interfaces';
import { CustomerTable } from '../interfaces';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AppService } from '../services/app-service';

@Component({
  selector: 'purchase-order-form',
  templateUrl: './purchase-order-form.component.html',
  styleUrls: ['./purchase-order.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
  ],
})
export class PurchaseOrderFormComponent implements OnInit {
  companyList: any = [];
  projectList: any = [];
  quotationList: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService
  ) {}
  ngOnInit(): void {
    console.log('======dataa', this.data);
    this.getCompanyList();
  }

  getCompanyList() {
    this.appService.getAllCompanies().subscribe((res: CustomerTable[]) => {
      console.log('company list dataa', res);
      this.companyList = res.map((data) => {
        return { _id: data._id, name: data.name };
      });
    });
  }
    getProjectsOfCustomer(customerId : string){
    this.appService.getProjectsByCustomerId(customerId).subscribe((res: any) => {
        console.log("==== data",this.data);
        console.log("=======r es", res);
        this.projectList = res.map((data : any) => {
            return { _id: data._id, name: data.name}
        })
    })
   }

   onCustomerChange(e:any){
    console.log("======== on customer changes", e);
    if(e._id){
        this.getProjectsOfCustomer(e._id);
    }
   }

   onProjectChange(e: any){
    console.log("======= e on project sekeld", e);
    console.log("==== data",this.data);
    this.getQuotationByProject(this.data.companyName._id, this.data.projectName._id)
   }

   getQuotationByProject(customerId: string, projectId: string){
    this.appService.getQuotationByProject(customerId, projectId).subscribe((res: any) => {
      this.quotationList = res;
    })
   }

   onFileUpload(e: any){

   }

   savePurchaseOrder(data: any){
    console.log("=========== data to save", data);
    let reqData = {
      poNumber: data.poNumber,
      projectId: data.projectName._id,
      quotationId: data.quotation._id
    }
    this.appService.savePurchaseOrder(reqData).subscribe((res: any) => {
      console.log("==== saved po", res);
    })
   }
}
