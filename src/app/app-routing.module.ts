import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationComponent } from './quotation/quotation.component';
import { CompaniesComponent } from './companies/companies.component';
import { ProjectComponentComponent } from './project/project.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
