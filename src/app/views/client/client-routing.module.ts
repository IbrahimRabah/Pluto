import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { ClientHistoryComponent } from './components/client-history/client-history/client-history.component';
import { ClientDetailesComponent } from './components/client-detailes/client-detailes.component';
import { LeaderIntervieweeComponent } from './components/leader-interviewee/leader-interviewee.component';

const routes: Routes = [
  { path: '', redirectTo: 'clientHome', pathMatch: 'full' },
  { path: 'clientHome', component: ClientHomeComponent },
  { path: 'leader-interviewees', component: LeaderIntervieweeComponent },
  { path: 'clientDetailes/:id', component: ClientDetailesComponent },
  { path: 'clientHistory', component: ClientHistoryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
