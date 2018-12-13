import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { productRoutes } from './product-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProductModule { }
