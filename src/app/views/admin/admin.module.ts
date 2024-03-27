import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SalesSectionDetailsComponent } from './components/sales-section-details/sales-section-details.component';
import { MangmentSectionDetailsComponent } from './components/mangment-section-details/mangment-section-details.component';
import { ClientsSectionDetailsComponent } from './components/clients-section-details/clients-section-details.component';
import { LeaderSectionDetailsComponent } from './components/leader-section-details/leader-section-details.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    SalesSectionDetailsComponent,
    MangmentSectionDetailsComponent,
    ClientsSectionDetailsComponent,
    LeaderSectionDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    FormsModule
  ]
})
export class AdminModule { }
