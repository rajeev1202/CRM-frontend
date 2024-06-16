import { Component } from '@angular/core';
import { CustomerTable } from '../interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppService } from '../services/app-service';
import { PdfViewerDialogComponent } from '../pdf-viewer-dialog/pdf-viewer-dialog.component';

@Component({
  selector: 'app-project-component',
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.css']
})
export class ProjectComponentComponent {
  title = 'crm-tool';
  showFiller = false;
  customer_Table: CustomerTable[] = [];
  displayedColumns: string[] = [
    'Project Name',
    'Company Name',
    'Quotation'
  ];

  constructor(public dialog: MatDialog, private appservice: AppService,
    public pdfDialog: MatDialog) {}

  ngOnInit(): void {
    this.getProjects();
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

  openViewQuotation(element: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '90vh';
    element['companyName'] = element.companyDetails[0].name;
    let quotationDate = new Date(element.quotationData[0].dateOfQuotation);
    element['shortQuoteDate'] = quotationDate.toLocaleString(
      'default',
      { day: 'numeric', month: 'long', year: 'numeric' }
    );
    let obj = {
      companyDetails: element.companyDetails[0],
      shortQuoteDate: element.shortQuoteDate,
      companyName: element.companyDetails[0].name,
      ...element.quotationData[0]
    }
    dialogConfig.data = obj;

    this.pdfDialog.open(PdfViewerDialogComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //   }
    // });
  }
  
  getProjects = () => {
    this.appservice.getProjects().subscribe((data: CustomerTable[]) => {
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
