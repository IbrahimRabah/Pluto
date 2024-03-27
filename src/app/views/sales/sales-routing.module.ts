import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { SalesHistoryComponent } from './sales-history/sales-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'salesHome', pathMatch: 'full' },
  { path: 'salesHome', component: SalesHomeComponent },
  { path: 'salesHome/:id', component: SalesHomeComponent },
  { path: 'salesHistory', component: SalesHistoryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
