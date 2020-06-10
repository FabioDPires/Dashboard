import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarComponent } from './bar/bar.component';
import { ClientsComponent } from './clients/clients.component';
import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductsComponent } from './products/products.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SalesMonthComponent } from './sales-month/sales-month.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';

const routes: Routes = [
  { path: 'sales', component: SalesComponent },
  {
    path: 'purchases',
    component: PurchaseComponent,
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/suppliers', component: SupplierComponent },
  { path: 'dashboard/clients', component: ClientsComponent },
  { path: 'dashboard/products', component: ProductsComponent },
  { path: 'dashboard/client/:id', component: ClientDetailsComponent },
  { path: 'dashboard/product/:id', component: ProductDetailsComponent },
  { path: 'dashboard/supplier/:id', component: SupplierDetailsComponent },
  { path: 'dashboard/sales', component: SalesMonthComponent },
  { path: 'dashboard/sale/:id', component: SalesDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
