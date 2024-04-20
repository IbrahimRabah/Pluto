import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { SalesListComponent } from './sales-list/sales-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'salesHome', pathMatch: 'full' },
  { path: 'salesHome', component: SalesHomeComponent },
  { path: 'salesHome/:id', component: SalesHomeComponent },
  { path: 'salesHistory', component: SalesHistoryComponent },
  { path: 'salesHistory/:id', component: SalesHistoryComponent },
  { path: 'salesList', component: SalesListComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
