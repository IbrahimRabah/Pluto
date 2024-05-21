import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';
import { ManagerInfo } from 'src/app/core/models/managerInfo';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
  providers: [MessageService, ConfirmationService, BrowserAnimationsModule]

})
export class MyprofileComponent {
  managerData!:ManagerInfo;
  updateUserIfo!: FormGroup;
  updateUserPassword!: FormGroup;
  displayUpdateInfoModal!: boolean;
  displayChangePasswordModal!:boolean;
  userId!:string;

  constructor(private auth:AuthenticationService,private confirmationService: ConfirmationService, private messageService: MessageService){}
  ngOnInit(): void {
    this.getUserId();
    this.getUserInfo();
  }
  getUserId()
  {
    this.userId = this.auth.getUserId();
  }
  getUserInfo():void
  {
    this.auth.getUserInfo().subscribe({
      next:(response)=>{
        this.managerData = response;
        this.initialization();
        this.changePassword();
      }
    })
  }
  initialization(): void {
    this.updateUserIfo = new FormGroup({
      name: new FormControl(this.managerData.data.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl(this.managerData.data.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.managerData.data.phoneNumber, [Validators.required]),
      companyPhoneNumber: new FormControl(this.managerData.data.companyPhoneNumber, [Validators.required]),
      nationalId: new FormControl(this.managerData.data.nationalId, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    });
  }
  changePassword(): void {
    this.updateUserPassword = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).+$')]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).+$')]),
    });
  }
  onSubmit(): void {
    if (this.updateUserIfo.valid) {
      let msg = "This action will Update Your Information,Ok?";
      this.Confirmation(msg,"editInfo");
    }
    this.displayUpdateInfoModal = false;

  }
  showUpdataInfoModal()
  {
    this.displayUpdateInfoModal = true;
  }
  change()
  {
    if (this.updateUserPassword.valid) {
      let msg = "This action will change your password,Ok?";
      this.Confirmation(msg,"changePassword");
    }
    this.displayChangePasswordModal = false;
  }
  showUpdataPasswordModal()
  {
    this.displayChangePasswordModal = true;
  }
  Confirmation(msg:string,action:string) {
    this.confirmationService.confirm({
      message: msg,
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        switch(action){
          case 'editInfo':
            this.auth.updateUserInfo(this.userId,this.updateUserIfo.value).subscribe({
              next:()=>{this.getUserInfo();}
            })
            break;
          case 'changePassword':
            this.auth.updateUserPassword(this.userId,this.updateUserPassword.value).subscribe({
              next:()=>{this.getUserInfo();}
            })
            break;
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
