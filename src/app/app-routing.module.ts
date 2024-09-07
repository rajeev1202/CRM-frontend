import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationComponent } from './quotation/quotation.component';
import { CompaniesComponent } from './companies/companies.component';
import { ProjectComponentComponent } from './project/project.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path: '',
    component:  CompaniesComponent
  },
  {
    path: 'quotation',
    component:  QuotationComponent
  },
  {
    path: 'projects',
    component:  ProjectComponentComponent
  },
  {
    path: 'purchase-order',
    component: PurchaseOrderComponent
  },
  {
    path:'invoice',
    component: InvoiceComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
