import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from './customer.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }

  getCustomerList(){
    return this.http.get(environment.apiURL+'/customer').toPromise();
   }

   getCustomerByID(id:number):any {
     console.log(id);
    return this.http.get(environment.apiURL + '/customer/getbyid?id='+id).toPromise();
  }

  create(category: Customer): Observable<Customer> {
    return this.http.post(environment.apiURL + `/customer/add` , category).pipe(
      catchError(this.handleError),
       map(this.jsonDataToCustomer)
    );
  } 

  private jsonDataToCustomers(jsonData: any[]): Customer[]{
    const customers: Customer[] = [];
    jsonData.forEach(element => customers.push(element as Customer));
    return customers;
  }

  private jsonDataToCustomer(jsonData: any): Customer{
    return jsonData as Customer;
  }

  private handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISICAO => ', error);
    return throwError(error);
  }
}
