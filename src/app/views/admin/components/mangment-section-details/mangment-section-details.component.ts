import { Component } from '@angular/core';

@Component({
  selector: 'app-mangment-section-details',
  templateUrl: './mangment-section-details.component.html',
  styleUrls: ['./mangment-section-details.component.scss']
})
export class MangmentSectionDetailsComponent {
  managerData:any[]=[
    {
      "PhoneNumber":'010598565656',
      "Company_Phone":'010598565656',
      "Email":'manager@manager.com',
      "National_ID":'3000526456565656'
    }
  ]
}
