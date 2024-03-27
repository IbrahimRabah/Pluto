import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientHistoryComponent } from './components/client-history/client-history/client-history.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


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
    
    
  ]
})
export class ClientModule { }
