import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
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
  formData = new FormData();

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
    if(e.target.files.length){
      this.data['uploadedFile'] =  e.target.files[0].name;
      this.formData.append('poDoc',e.target.files[0])
    }

   }

   savePurchaseOrder(data: any){
    this.formData.append('poNumber',data.poNumber);
    this.formData.append('projectId',data.projectName._id);
    this.formData.append('quotationId',data.quotation._id);
    this.appService.savePurchaseOrder(this.formData).subscribe((res: any) => {
      
    })
   }
}
