import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../models/Role';
import { HttpClient } from '@angular/common/http';
import { TeamLeaderService } from '../../services/teamleader/team-leader.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerationForm!: FormGroup;
  selectedRole!: number;
  isTeamLead!: number;
  roleOptions!: Role[];
  userRole!: string;
  adminRoleOptions: Role[] = [{ id: 1, name: "Manager" }, { id: 2, name: "TeamLeader" }, { id: 3, name: "Sales" }, { id: 4, name: "Hr" }, { id: 5, name: "Retention" }]
  managerRoleOptions: Role[] = [{ id: 2, name: "TeamLeader" }, { id: 3, name: "Sales" }, { id: 4, name: "Hr" }, { id: 5, name: "Retention" }]
  teamLeaderRoleOptions: Role[] = [{ id: 3, name: "Sales" }]
  teamLeads: Role[] = [{ id: 1, name: "Ibrahim" }, { id: 2, name: "Abdallah" }, { id: 3, name: "Moeen" }, { id: 4, name: "Nour" }]
  constructor(private auth: AuthenticationService, private teamLeaderService: TeamLeaderService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.initialization();
    this.getTeamLead();
    let userData = JSON.parse(localStorage.getItem('userData')!!);
    this.userRole = userData.role;
    switch (this.userRole) {
      case 'Admin':
        this.roleOptions = this.adminRoleOptions;
        break;
      case 'Manager':
        this.roleOptions = this.managerRoleOptions;
        break;
      case 'TeamLeader':
        this.roleOptions = this.teamLeaderRoleOptions;
        break;
      default:
        this.roleOptions = this.roleOptions;
    }
  }
  initialization(): void {
    this.registerationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).+$')]),
      rePassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).+$')]),
      phoneNumber: new FormControl('', [Validators.required]),
      companyPhoneNumber: new FormControl('', [Validators.required]),
      nationalId: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      role: new FormControl(0, [Validators.required]),
      superiorRole: new FormControl(0),
      teamLeaderId: new FormControl('0')
    });
  }
  onSubmit(): void {
    if (this.registerationForm.valid) {
      this.auth.register(this.registerationForm.value).subscribe(
        {
          next: (response) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfully' });
          }
        }
      )
    }
  }
  getTeamLead(): void {
    this.teamLeaderService.getAllTeamLeaders().subscribe({
      next: (response) => {
        this.teamLeads = response.data;
      }
    })
  }
}
