import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/customer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  productForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  customer: Customer = new Customer();
  submittingForm = false;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildProductForm();
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de novo produto';
    } else {
      const customerName = this.customer.name || '';
      this.pageTitle = 'Editando produto: ' + customerName;
    }
  }

  private buildProductForm() {
    this.productForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required]],
      qtyStock: [0, [Validators.required, Validators.min(1)]]
    });
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.create();
    } else { 
      this.update();
    }
  }

  private create() {
    const product: Item = Object.assign(new Item(), this.productForm.value);    
  }

  private update() {
    const product: Item = Object.assign(new Item(), this.productForm.value);  
    product.ItemID = parseInt(this.route.snapshot.paramMap.get('id'));
  }
}
