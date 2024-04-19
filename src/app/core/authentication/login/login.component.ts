import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  apiError!: string;
  @ViewChild('container') containerDiv!: ElementRef;
  constructor(private auth: AuthenticationService, private router: Router, private messageService: MessageService) { }
  ngOnInit(): void {
    this.initialization();
  }
  initialization() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }
    )
  }
  onSubmit() {
    {

      if (!this.loginForm.invalid) {
        this.auth.login(this.loginForm.value).subscribe({
          next: (response) => {

            if (response.statusCode == 200) {
              let role = response.data.roleName;
              let tenantId = response.data.tenantId;
              let token = response.data.token;
              localStorage.setItem('userData', JSON.stringify({ role, tenantId, token }));
              switch (role) {
                case 'Admin':
                  this.router.navigate(['/admin/dashboard'])
                  break;
                case 'Manager':
                  this.router.navigate(['/admin/dashboard']);
                  break;
                case 'Sales':
                  this.router.navigate(['/sales/salesHome']);
                  break;
                case 'TeamLeader':
                  this.router.navigate(['/client/clientHome']);
                  break;
                case 'Retention':
                  this.router.navigate(['/client/clientHistory']);
                  break;
                case 'Sales':
                  this.router.navigate(['/sales/salesHome']);
                  break;
                case 'Hr':
                  this.router.navigate(['/hr/home']);
                  break;
              }
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'error', detail: 'Error' });
              this.apiError = response.message;
              console.log("else")
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.apiError = err.message;
            console.log("error");

          }
        })
      } else {
        this.apiError = "Not Valid";
      }
    }
  }


  toggle(action:string)
  {
    switch(action)
    {
      case 'add':
        this.containerDiv.nativeElement.classList.add('active');
        break;
      default:
        this.containerDiv.nativeElement.classList.remove('active');
    }

  }
}
