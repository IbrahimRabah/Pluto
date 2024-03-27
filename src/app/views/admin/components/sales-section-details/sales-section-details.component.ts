import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-sales-section-details',
  templateUrl: './sales-section-details.component.html',
  styleUrls: ['./sales-section-details.component.scss']
})
export class SalesSectionDetailsComponent {
  customers!: any[];

  totalRecords!: number;

  loading: boolean = false;

  representatives!: any[];

  selectAll: boolean = false;

  selectedCustomers!: any[];

  constructor(private customerService: AdminService) {}

  ngOnInit() {
      this.representatives = [
          { name: 'Amy Elsner', image: 'amyelsner.png' },
          { name: 'Anna Fali', image: 'annafali.png' },
          { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
          { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
          { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
          { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
          { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
          { name: 'Onyama Limba', image: 'onyamalimba.png' },
          { name: 'Stephen Shaw', image: 'stephenshaw.png' },
          { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
      ];

      this.loading = true;
  }

  loadCustomers(event: any) {
      this.loading = true;

      setTimeout(() => {
          this.customerService.getCustomers({ lazyEvent: JSON.stringify(event) }).then((res:any) => {
              this.customers = res.customers;
              this.totalRecords = res.totalRecords;
              this.loading = false;
          });
      }, 1000);
  }

  onSelectionChange(value = []) {
      this.selectAll = value.length === this.totalRecords;
      this.selectedCustomers = value;
  }

  onSelectAllChange(event: any) {
      const checked = event.checked;

      if (checked) {
          this.customerService.getCustomers().then((res:any) => {
              this.selectedCustomers = res.customers;
              this.selectAll = true;
          });
      } else {
          this.selectedCustomers = [];
          this.selectAll = false;
      }
  }

}
