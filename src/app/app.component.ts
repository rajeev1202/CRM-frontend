import { Component,Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { AppService } from './services/app-service';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VALID_CURRENCY_CODE } from '../constants';

export interface CustomerTable {
  name : string;
  contactPerson: string;
  location: string;
  currency: string;
  email: string;
  createdAt?: string;
}

const DUMMY_DATA : CustomerTable[]  = []
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit{
  title = 'crm-tool';
  showFiller = false;
  customer_Table: CustomerTable[] = [];
  displayedColumns: string[] = ['customer name','created date','contact person','location','currency','email']
  
  constructor(
    public dialog: MatDialog,
    private appservice : AppService
    ) {
    }

    ngOnInit(): void {
      this.getCompaines()
    }

    customerForm = {
      name: '',
      contactPerson: '',
      location: '',
      currency: '',
      email: '',
    };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.customerForm,  
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.appservice.AddCompaniesDetails(result)
      .subscribe(async (data:any) => {
        console.log("new company details got saved")
        if(data){
         await this.getCompaines();
        }
      })
    });
  }


  getCompaines = () => {
    this.appservice.getAllCompanies()
    .subscribe((data : CustomerTable[]) => {
        console.log("= === companies data",data)
        this.customer_Table = data
    })
}
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,MatSelectModule,CommonModule],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerTable,
  ) {}

  ValidCurrencyCode  = VALID_CURRENCY_CODE;
  onNoClick(): void {
    this.dialogRef.close();
  }
}
