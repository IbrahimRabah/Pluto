import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog'

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    NotfoundComponent,
    SideBarComponent,
    MainContentComponent,
    MyprofileComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ButtonModule,
    SidebarModule,
    TableModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    NotfoundComponent,
    SideBarComponent,
    ButtonModule,
    SidebarModule,
    MainContentComponent,
    MyprofileComponent
  ]
})
export class SharedModule { }
