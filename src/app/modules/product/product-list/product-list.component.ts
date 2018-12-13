import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../01-services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  orderList;

  constructor(
    private service: ProductService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
      this.refreshList();
    }

    refreshList() {
      this.service.getList().then(res => this.orderList = res);
    }

    // openForEdit(productID: number) {
    //   this.router.navigate(['/product/edit/' + productID]);
    // }
}