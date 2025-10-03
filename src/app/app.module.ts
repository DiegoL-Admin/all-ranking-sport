import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { MostPopularProductsComponent } from './components/most-popular-products/most-popular-products.component';
import { RegisterComponent } from './components/register/register.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ProductListComponent,
    CartComponent,
    CheckoutComponent,
    BannerComponent,
    FooterComponent,
    MostPopularProductsComponent,
    RegisterComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
