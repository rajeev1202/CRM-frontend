import { Component, Inject, OnInit } from '@angular/core';
import { CustomerTable, ProjectForm } from '../interfaces';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../services/app-service';
import { PdfViewerDialogComponent } from '../pdf-viewer-dialog/pdf-viewer-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-component',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
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

  projectForm = {
    projectName: '',
    company: {
    _id: ''
    }
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
      console.log("data: ",data);
      this.customer_Table = data;
    });
  };

  // getContacts = () => {
  //   this.appservice.getAllContacts().subscribe((data : ContactsInterface[]) => {
  //     // this.contactsData = data;
  //   })
  // }

  resetCompaniesForm = () => {
    this.projectForm = {
      projectName: '',
      company: {
        _id: ''
      }

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

  openProjectDialog(): void {
    const dialogRef = this.dialog.open(AddProjectDialog, {
      data: this.projectForm,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      // result.email = result.email.split(',').map((data: string) => data.trim());
      // result.phoneNumber = result.phoneNumber
      //   .split(',')
      //   .map((data: string) => data.trim());
      // result.contactPerson = result.contactPerson ? result.contactPerson._id : "";
      console.log(this.projectForm);
      this.appservice
        .saveProjects({
          customerId: this.projectForm?.company?._id,
          projectName: this.projectForm.projectName
        })
        .subscribe(async (data: any) => {
          if (data) {
            await this.getProjects();
          }
        });
    });
  }

  getCompaines = () => {
    this.appservice.getAllCompanies().subscribe((data: CustomerTable[]) => {
      this.customer_Table = data;
    });
  };

}

@Component({
  selector: 'project-addition-dialog',
  templateUrl: 'project-addition-dialog.html',
  styleUrls: ['./project.component.css'],
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
export class AddProjectDialog implements OnInit {
  companies : CustomerTable[] = []
  constructor(
    public dialogRef: MatDialogRef<AddProjectDialog>,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: ProjectForm
  ) {}

  // ValidCurrencyCode = VALID_CURRENCY_CODE;
  // VALID_TAXATION = VALID_TAXATION;

  ngOnInit(): void {
    this.getAllCompanies()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveProject(): void {
    // this.saveProjects();
    this.dialogRef.close();
  }

  getAllCompanies = () => {
    this.appservice.getAllCompanies().subscribe((data : CustomerTable[]) => {
      this.companies = data;
    })
  }

  
}
