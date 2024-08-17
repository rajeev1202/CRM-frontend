import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app-service';
import { PurchaseOrderFormComponent } from './purchase-order-form.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],

})
export class PurchaseOrderComponent implements OnInit {
  poData = [];
  displayedColumns = [
    'Customer Name',
    'Project Name',
    'Quotation No',
    'PO Number'
  ]
  constructor( private appService : AppService, public dialog: MatDialog){

  }


  ngOnInit(): void {
    this.appService.getAllPurchaseOrders().subscribe((data) => {
      if(data && data.length)
      this.poData = data
    })
  }

  onClickOpen(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data  = {}
    const dialogRef = this.dialog.open(PurchaseOrderFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
      });
  }
}


