import { Component, Inject, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pdf-viewer-dialog',
  templateUrl: './pdf-viewer-dialog.component.html',
  styleUrls: ['./pdf-viewer-dialog.component.css']
})
export class PdfViewerDialogComponent implements OnInit {

  quotationsData: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PdfViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.quotationsData = data;
  }

  ngOnInit() {

  }
  convertToPDF() {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const elements = document.querySelectorAll('.pdf-content');
  
    elements.forEach((element :any, index) => {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
  
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft > 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        if (index === elements.length - 1) {
          pdf.save(this.quotationsData.quotationNumber + '.pdf');
        }
      });
    });
  }

}
