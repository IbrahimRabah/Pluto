import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { ClientHistoryComponent } from './components/client-history/client-history/client-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'clientHome', pathMatch: 'full' },
  { path: 'clientHome', component: ClientHomeComponent },
  { path: 'clientHome/:id', component: ClientHomeComponent },
  { path: 'clientHistory', component: ClientHistoryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
