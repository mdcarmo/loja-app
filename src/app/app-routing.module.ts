import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { CustomerModule } from './modules/customer/customer.module';
import { HomeModule } from './modules/home/home.module';
import { ProductModule } from './modules/product/product.module';

const routes: Routes = [
  {path:'', loadChildren: () => HomeModule},
  { path: 'customers', loadChildren: () => CustomerModule },
  { path: 'products', loadChildren: () => ProductModule },

  {path:'orders',component:OrdersComponent},
  {path:'order',children:[
    {path:'',component:OrderComponent},  
    {path:'edit/:id',component:OrderComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
