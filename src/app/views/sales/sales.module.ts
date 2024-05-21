import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SalesListComponent } from './sales-list/sales-list.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog'
@NgModule({
  declarations: [
    SalesHistoryComponent,
    SalesHomeComponent,
    SalesListComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
    ToastModule,
    CalendarModule,
    ConfirmDialogModule
  ]
})
export class SalesModule { }
