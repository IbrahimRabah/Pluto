import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { HomeComponent } from './componenets/home/home.component';
import { IntervieweeComponent } from './componenets/interviewee/interviewee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog'

@NgModule({
  declarations: [
    HomeComponent,
    IntervieweeComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    FormsModule,ReactiveFormsModule,TableModule,ToastModule,
    CalendarModule,ButtonModule,
    DialogModule,
    ConfirmDialogModule
  ]
})
export class HrModule { }
