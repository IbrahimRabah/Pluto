import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    SalesHistoryComponent,
    SalesHomeComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
    ToastModule
  ]
})
export class SalesModule { }
