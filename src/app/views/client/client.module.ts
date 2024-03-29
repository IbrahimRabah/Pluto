import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientHistoryComponent } from './components/client-history/client-history/client-history.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';




@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientHistoryComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    FormsModule,
    ToastModule,
    CalendarModule
    
  ]
})
export class ClientModule { }
