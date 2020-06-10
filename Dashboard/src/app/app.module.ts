import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { SupplierComponent } from './supplier/supplier.component';
import { SpentSuppliersComponent } from './spent-suppliers/spent-suppliers.component';
import { SpentClientsComponent } from './spent-clients/spent-clients.component';
import { TopProductsComponent } from './top-products/top-products.component';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './card/card.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TopProductsMoneyComponent } from './top-products-money/top-products-money.component';
import { SalesMonthComponent } from './sales-month/sales-month.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    ClientsComponent,
    ProductsComponent,
    SalesComponent,
    PurchaseComponent,
    DashboardComponent,
    SupplierComponent,
    SpentSuppliersComponent,
    SpentClientsComponent,
    TopProductsComponent,
    CardComponent,
    ClientDetailsComponent,
    ProductDetailsComponent,
    SupplierDetailsComponent,
    SideBarComponent,
    TopProductsMoneyComponent,
    SalesMonthComponent,
    SalesDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
