import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  orderList;

  constructor(
    private service: CustomerService,
    private router: Router,
    private toastr: ToastrService) { }

    ngOnInit() {
      this.refreshList();
    }

    refreshList() {
      this.service.getCustomerList().then(res => this.orderList = res);
    }

    // openForEdit(customerID: number) {
    //   this.router.navigate(['/customer/edit/' + customerID]);
    // }
}
