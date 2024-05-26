import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, FormGroup, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { VALID_CURRENCY_CODE } from '../../constants';
import { QuotationForm } from '../interfaces';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AppService } from '../services/app-service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PdfViewerDialogComponent } from '../pdf-viewer-dialog/pdf-viewer-dialog.component';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['../app.component.css'],
})
export class QuotationComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  quotationsData: any = [];
  quotationList: any = [];
  displayedColumns: string[] = [
    'Quotation Number',
    'Company Name',
    'Project Name',
    'Submitted To',
    'Date Of Quotation',
    'Quoatation'
  ];
  selectRow: any;
  constructor(public dialog: MatDialog, public pdfDialog: MatDialog, public appService: AppService) {}

  ngOnInit(): void {
    this.getQuotationList();
    // this.getQuotationData();
  }

  quotationForm = {
    quotationNo: '',
    companyId: '',
    projectDescription: '',
    currency: '',
    ratePerHour: '',
    estimatedHours: '',
    estimateDate: '',
    expiryDate: '',
  };

  openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      var opt = {
        margin: 1,
        filename: 'ontract.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: 'avoid-all', after: '.avoidThisRow' },
      };
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.quotationsData.quotationNumber + '.pdf');
    });
  }

  openQuotationForm(): void {
    const dialogRef = this.dialog.open(QuotationData);

    dialogRef.afterClosed().subscribe((result) => {
      this.appService.createQuotation(result).subscribe((data: any) => {
        // this.getQuotationData();
        this.getQuotationList();
      });
    });
  }

  // getQuotationData() {
  //   this.appService.getAllQuotations().subscribe((data) => {
  //     this.quotationsData = data[0];
  //     this.quotationsData['companyName'] = data[0].companyDetails[0].name;
  //     const quotationDate = new Date(data[0].dateOfQuotation);
  //     this.quotationsData['shortQuoteDate'] = quotationDate.toLocaleString(
  //       'default',
  //       { day: 'numeric', month: 'long', year: 'numeric' }
  //     );
  //     this.quotationsData['isDiscountApplied'] = this.isDiscountApplied(
  //       this.quotationsData.activities
  //     );
  //   });
  // }

  getQuotationList() {
    this.appService.getAllQuotationsList().subscribe((data) => {
      this.quotationList = data;
    });
  }

  isDiscountApplied(activitiesData: any) {
    for (let activity of activitiesData) {
      if (activity.isDiscountApplied) return true;
    }
    return false;
  }

  openViewQuotation(element: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '90vh';
    element['companyName'] = element.companyDetails[0].name;
    let quotationDate = new Date(element.dateOfQuotation);
    element['shortQuoteDate'] = quotationDate.toLocaleString(
      'default',
      { day: 'numeric', month: 'long', year: 'numeric' }
    );
    dialogConfig.data = element;
    console.log("open dialog: ", element);

    this.pdfDialog.open(PdfViewerDialogComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //   }
    // });
  }
}

@Component({
  selector: 'quotation-form',
  templateUrl: 'quotation-form.component.html',
  styleUrls: ['../app.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
})
export class QuotationData implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuotationData>,
    public pdfDialofRef: MatDialogRef<PdfViewerDialogComponent>,
    public appService: AppService
  ) {}
  companyList: any = [];
  ValidCurrencyCode = VALID_CURRENCY_CODE;

  quotationForm = this.fb.group({
    quotationNumber: this.fb.control(''),
    companyId: this.fb.control(''),
    projectName: this.fb.control(''),
    submittedTo: this.fb.control(''),
    currency: this.fb.control(''),
    sowNumber: this.fb.control(''),
    divisionOfWork: this.fb.control(''),
    revisionNumber: this.fb.control(0),
    dateOfQuotation: this.fb.control(''),
    inputDocReceived: this.fb.array([
      this.fb.group({ name: this.fb.control('') }),
    ]),
    activities: this.fb.array([
      this.fb.group({
        name: this.fb.control(''),
        workingHrs: this.fb.control(0),
        ratePerHrs: this.fb.control(0),
        isDiscountApplied: this.fb.control(false),
        discountPercentage: this.fb.control(0),
      }),
    ]),
  });

  ngOnInit(): void {
    this.getCompanyList();
    const date = new Date()
      .toLocaleString('default', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      })
      .split(',');
    const dateComponent = date[0].replaceAll('/', '');
    const timeComponent = date[1].trim().replaceAll(':', '');

    this.quotationForm.controls['quotationNumber'].setValue(
      'QN' + dateComponent + timeComponent
    );
  }

  get activities() {
    return this.quotationForm.get('activities') as FormArray;
  }

  get inputDocReceived() {
    return this.quotationForm.get('inputDocReceived') as FormArray;
  }

  getCompanyList(): void {
    this.appService.getCompaniesList().subscribe((result) => {
      this.companyList = result;
    });
  }

  addActivities(): void {
    this.activities.push(
      this.fb.group({
        name: this.fb.control(''),
        workingHrs: this.fb.control(0),
        currency: this.fb.control(''),
        ratePerHrs: this.fb.control(0),
      })
    );
  }
  addInputDocReceived() {
    this.inputDocReceived.push(this.fb.group({ name: this.fb.control('') }));
  }
  onDiscard(): void {
    this.dialogRef.close();
  }

  getSubItems(itemIndex: number, controlName: string) {
    return this.activities.at(itemIndex).get(controlName)?.value;
  }

  getDiscountedPrice(
    ratePerHour: number,
    workingHrs: number,
    percentage: number
  ) {
    return (ratePerHour * workingHrs * percentage) / 100;
  }
}
