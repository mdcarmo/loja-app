import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/customer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/customer.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit, AfterContentChecked {
  
  currentAction: string;
  customerForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;
  customer: Customer = new Customer();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private service: CustomerService,
  ) { }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildTrainingForm();
    this.loadCustomer();
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de novo cliente';
    } else {
      const customerName = this.customer.name || '';
      this.pageTitle = 'Editando cliente: ' + customerName;
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildTrainingForm() {
    this.customerForm = this.formBuilder.group({
      id: [null],
      Name: [null, [Validators.required, Validators.minLength(2)]]
    });
  }

  private loadCustomer() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.service.getCustomerByID(+params.get('id')))
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.customer  = data;
          this.customerForm.patchValue(data);
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      );
    }
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
    const customer: Customer = Object.assign(new Customer(), this.customerForm.value);   
    
    console.log(customer)

    this.service.create(customer)
      .subscribe(
        customer => {
          return this.actionsForSuccess(customer);
        },
        error => this.actionsForError(error)
      );
  }

  private update() {
    const customer: Customer = Object.assign(new Customer(), this.customerForm.value);  
    customer.customerID = parseInt(this.route.snapshot.paramMap.get('id'));

    // this.service.update(customer)
    // .subscribe(
    //   training => this.actionsForSuccess(customer),
    //   error => this.actionsForError(error)
    // );
  }

  private actionsForSuccess(customer: Customer) {
    this.toastr.success("Solicitação processada com sucesso!");
    this.router.navigate(['/customers']);
  }

  private actionsForError(error) {
    this.toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
    }
  }
}