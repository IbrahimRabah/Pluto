import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MangmentSectionDetailsComponent } from './components/mangment-section-details/mangment-section-details.component';
import { LeaderSectionDetailsComponent } from './components/leader-section-details/leader-section-details.component';
import { SalesSectionDetailsComponent } from './components/sales-section-details/sales-section-details.component';
import { ClientsSectionDetailsComponent } from './components/clients-section-details/clients-section-details.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard', pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,
  children:[
    {
      path:'managers', component:MangmentSectionDetailsComponent
    },
    {
      path:'leaders',component:LeaderSectionDetailsComponent
    },
    {
      path:'sales',component:SalesSectionDetailsComponent
    },
    {
      path:'clients',component:ClientsSectionDetailsComponent
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
