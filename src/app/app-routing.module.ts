import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogOverviewExampleDialog } from './app.component';
import { HeaderComponent } from './header/header.componet';

const routes: Routes = [
  // {
  //   path: 'companies',
  //   component: HeaderComponent
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
