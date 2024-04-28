import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AppService } from './services/app-service';
import { CommonModule } from '@angular/common';
import { VALID_CURRENCY_CODE,VALID_TAXATION } from '../constants';
import { CustomerTable, ContactsInterface } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'crm-tool';
  showFiller = false;
  customer_Table: CustomerTable[] = [];
  displayedColumns: string[] = [
    'customer name',
    'contact person',
    'location',
    'currency',
    'email',
    'phoneNumber',
    'created date',
  ];

  constructor(public dialog: MatDialog, private appservice: AppService) {}

  ngOnInit(): void {
    this.getCompaines();
  }

  customerForm = {
    name: '',
    contactPerson: '',
    location: '',
    currency: '',
    email: '',
    phoneNumber: '',
  };

  contactsForm = {
    name: '',
    email: '',
    phoneNumber: '',
    employedWith: '',
    positionInOrg: '',
    note: ''

  }

  openCustomerDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.customerForm,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.resetCompaniesForm();
      result.email = result.email.split(',').map((data: string) => data.trim());
      result.phoneNumber = result.phoneNumber
        .split(',')
        .map((data: string) => data.trim());
      result.contactPerson = result.contactPerson ? result.contactPerson._id : "";
      this.appservice
        .addCompaniesDetails(result)
        .subscribe(async (data: any) => {
          if (data) {
            await this.getCompaines();
          }
        });
    });
  }

  openContactsDialog(){
    const contactFormRef = this.dialog.open( contactsForms, {
      data: this.contactsForm
    })
    contactFormRef.afterClosed().subscribe((result) => {
      this.resetContactsForm();
      // save new contact and reset the form
      let emails = result.email.split(',').map((data: string) => data.trim());
      let phoneNumber = result.phoneNumber
        .split(',')
        .map((data: string) => data.trim());
      result.email = result.email.split(',').map((data: string) => data.trim());
      result.phoneNumber = result.phoneNumber
        .split(',')
        .map((data: string) => data.trim());
        this.appservice.saveNewContact(result)
        .subscribe(async (data:any) => {
          if(data){
            return;
          }
        })
    } )
  }
  getCompaines = () => {
    this.appservice.getAllCompanies().subscribe((data: CustomerTable[]) => {
      this.customer_Table = data;
    });
  };

  // getContacts = () => {
  //   this.appservice.getAllContacts().subscribe((data : ContactsInterface[]) => {
  //     // this.contactsData = data;
  //   })
  // }

  resetCompaniesForm = () => {
    this.customerForm = {
      name: '',
      contactPerson: '',
      location: '',
      currency: '',
      email: '',
      phoneNumber: '',
    };
  };

  resetContactsForm = () => {
    this.contactsForm = {
      name: '',
      email: '',
      phoneNumber: '',
      employedWith: '',
      positionInOrg: '',
      note: ''
    };
  };
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
  ],
})
export class DialogOverviewExampleDialog implements OnInit {
  contactsData : ContactsInterface[] = []
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: CustomerTable
  ) {}

  ValidCurrencyCode = VALID_CURRENCY_CODE;
  VALID_TAXATION = VALID_TAXATION;

  ngOnInit(): void {
    this.getContacts()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getContacts = () => {
    this.appservice.getAllContacts().subscribe((data : ContactsInterface[]) => {
      this.contactsData = data;
    })
  }
}


@Component({
  selector: 'contacts-form',
  templateUrl: 'contacts-form.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
  ],
})

export class contactsForms {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ContactsInterface
  ){}

  hideForm(){
    this.dialogRef.close();
  }

}
