import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationComponent } from './quotation/quotation.component';

const routes: Routes = [
  {
    path: 'quotation',
    component:  QuotationComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
