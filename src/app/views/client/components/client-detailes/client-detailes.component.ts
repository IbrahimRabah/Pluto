import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SalesService } from 'src/app/core/services/sales/sales.service';
import { RetentionService } from 'src/app/core/services/retention/retention.service';
import { TeamLeaderService } from 'src/app/core/services/teamleader/team-leader.service';
import { DepositService } from 'src/app/core/services/deposit/deposit.service';
import { RedepositService } from 'src/app/core/services/redeposit/redeposit.service';
import { ClientLotService } from '../../services/client-lot.service';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';

@Component({
  selector: 'app-client-detailes',
  templateUrl: './client-detailes.component.html',
  styleUrls: ['./client-detailes.component.scss'],
  providers: [MessageService]
})
export class ClientDetailesComponent implements OnInit {

  clientData: any
  clientLots: any
  clientDeposit: any
  updateForm!: FormGroup;
  clientId: any;
  salesList!: any;
  retentionId: any;
  teamLeadId: any;
  displayRetentionModal!: boolean
  displayTeamLeadModal!: boolean
  displayRedepositModal!: boolean
  displayUpdateDepositModal!: boolean
  displayUpdateRedepositModal!: boolean
  redepositAmount!: number;
  updateDepositAmount!: number;
  updateRedepositAmount!: number;
  expandedRows: { [key: string]: boolean } = {};
  selectedDepositRedeposits: any[] = [];
  displayDialog: boolean = false;
  retentionList!: any
  teamLeadList: any
  displayModal: boolean = false;
  selectedNumber: number = 0;
  currentClient: any;
  displayClientLotModal: boolean = false
  displayUpdateClientLotModal: boolean = false
  lotAmount: number = 0;
  updatedLotId!: string
  depositId!: string
  reDepositId!: string
  userRole: string = ""
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private messageService: MessageService,
    private salesService: SalesService,
    private depositService: DepositService,
    private retentionService: RetentionService,
    private teamLeaderService: TeamLeaderService,
    private redepositService: RedepositService,
    private clientLotService: ClientLotService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.getUserRole();
    this.initRout();
    this.getClientData();
    this.initializeClientForm();
    this.getDepositForClient();

    if (this.userRole !== 'Retention') {
      this.getSales();
      this.getTeamLead();
    }

    if (this.userRole === 'Manager') {
      this.getRetention();
    }

    this.getClientLotForClient();
  }
  getUserRole() {
    this.userRole = this.auth.getUserRole()
  }

  initRout() {
    this.activatedRoute.params.subscribe(params => {
      this.clientId = params['id'];
    });
  }

  initializeClientForm() {
    this.updateForm = this.formBuilder.group({
      name: [''],
      nationalId: [''],
      phoneNumber: [''],
      email: [''],
      accountId: [''],
      platform: [''],
      company: [''],
      status: [0],
      statusName: [''],
      teamLeaderName: [''],
      salesName: [''],
      retentionName: [''],
      teamLeaderId: [''],
      salesId: [''],
      retentionId: ['']
    });
  }
  showModal(): void {
    this.displayRetentionModal = true;
  }
  showTeamdLeadModal() {
    this.displayTeamLeadModal = true
  }
  showDepositModal() {
    this.displayModal = true;
  }
  showAddClientLot() {
    this.lotAmount = 0;
    this.displayClientLotModal = true;
  }
  showUpdateClientLotModal(updatelotId: string) {
    this.lotAmount = 0;
    this.displayUpdateClientLotModal = true;
    this.updatedLotId = updatelotId
  }
  showUpdateDepositModal(depositId: string, updateDepositAmount: number) {
    this.updateDepositAmount = updateDepositAmount;
    this.depositId = depositId;
    this.displayUpdateDepositModal = true;
  }
  deposit(): void {

    this.depositService.addDepositForClient({
      deposit: this.selectedNumber,
      clientId: this.clientId
    }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deposit added Successfully' });
        this.getDepositForClient();
        this.getClientData();
      }
    })

    this.displayModal = false;
  }

  reDeposit(depositId: string) {
    this.displayRedepositModal = true;
    this.redepositAmount = 0;
    this.depositId = depositId;
  }

  openUpdateRedeposit(redepositId: string, redepositAmount: number) {
    this.displayUpdateRedepositModal = true;
    this.updateRedepositAmount = redepositAmount;
    this.reDepositId = redepositId;
  }

  updateRedeposit() {
    this.redepositService.updateReDeposit(this.reDepositId, {
      amount: this.updateRedepositAmount
    }).subscribe({
      next: () => {
        this.getDepositForClient();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Redeposit Done' });
        this.displayUpdateRedepositModal = false;
        this.displayDialog = false;

      }
    })
    this.updateRedepositAmount = 0;
  }

  redeposit() {
    this.redepositService.reDeposit({
      depositId: this.depositId,
      clientId: this.clientId,
      amount: this.redepositAmount
    }).subscribe({
      next: () => {
        this.getDepositForClient();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Redeposit Done' });
        this.displayRedepositModal = false;

      }
    })
  }
  addLot() {
    this.clientLotService.addClientLot({
      clientId: this.clientId,
      amount: this.lotAmount
    }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lot added Successfully' });
        this.getClientLotForClient();
        this.displayClientLotModal = false;
      }
    })
  }

  updateLot() {
    this.clientLotService.updateClientLot(this.updatedLotId, {
      amount: this.lotAmount,
      date: new Date()
    }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lot updated Successfully' });
        this.getClientLotForClient();
        this.displayUpdateClientLotModal = false;
      }
    })
  }
  deleteLot(lotId: string) {
    this.clientLotService.deleteClientLot(lotId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Lot deleted successfully' });
        this.getClientLotForClient();
      }
    })
  }
  assignToRetention() {
    this.clientService.assignClientToRetention(this.clientId, this.retentionId).subscribe({
      next: () => {
      }
    })
    this.displayRetentionModal = false;

  }
  changeTeamLead() {
    this.clientService.changeTeamLead(this.clientId, this.teamLeadId).subscribe({
      next: (data) => {
      }
    })
    this.displayTeamLeadModal = false;

  }
  getSales() {
    this.salesService.getAllSales().subscribe({
      next: (ress) => {
        this.salesList = ress.data
      }
    })
  }

  getRetention() {
    this.retentionService.getAllRetention().subscribe({
      next: (res) => {
        this.retentionList = res.data;
      }
    })
  }

  getTeamLead() {
    this.teamLeaderService.getAllTeamLeaders().subscribe({
      next: (res) => {
        this.teamLeadList = res.data;
      }
    })
  }

  getClientData() {
    this.clientService.getClientById(this.clientId).subscribe({
      next: (res: any) => {
        this.currentClient = res.data;
        this.updateForm.patchValue(res.data);

      }
    })
  }

  getDepositForClient() {
    this.depositService.getDepositById(this.clientId).subscribe({
      next: (res) => {
        this.clientDeposit = res.data;
      }
    })
  }

  getClientLotForClient() {
    this.clientLotService.getClientLostByClient(this.clientId).subscribe({
      next: (res) => {
        this.clientLots = res.data;
      }
    })
  }

  updateItemDetails(): void {
    if (this.updateForm.valid) {
      this.clientService.updateClient(this.clientId, this.updateForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
        }
      })
    }
  }

  deActive(depositId: string) {
    this.depositService.deActivateClient(depositId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deactivated Successfully' });
        this.getDepositForClient();
        this.getClientData();
      }
    })
  }

  updateDeposit() {
    this.depositService.updateDeposit(this.depositId, { amount: this.updateDepositAmount }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deposit added Successfully' });
        this.getClientData();
        this.getDepositForClient();
      }
    })
    this.displayUpdateDepositModal = false;
  }

  openDialog(deposit: any): void {
    this.selectedDepositRedeposits = deposit.redeposits;
    this.displayDialog = true;
  }

  deActivateClient() {
    this.clientService.deactivateUser(this.clientId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client Deactivated successfully' });
        this.getClientData();
        this.getDepositForClient();
      }
    })
  }
}
