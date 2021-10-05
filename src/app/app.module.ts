import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IonicStorageModule } from '@ionic/storage';
import { Common } from './services/common';
import { Api } from './services/api';
import { ProductSearchModalPageModule } from './product-search-modal/product-search-modal.module';
import { ProductFindModalComponent } from './product-find-modal/product-find-modal.component';
import { ProductDetailModalPageModule } from './product-detail-modal/product-detail-modal.module';
import { ReceivalDetailModalPageModule } from './receival-detail-modal/receival-detail-modal.module';
import { SaleDetailModalPageModule } from './sale-detail-modal/sale-detail-modal.module';
import { CustomerListModalPageModule } from './customer-list-modal/customer-list-modal.module';
import { CustomerEditModalPageModule } from './customer-edit-modal/customer-edit-modal.module';

import { CustomerCreatePageModule } from './customer-create/customer-create.module';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [AppComponent, ProductFindModalComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ProductSearchModalPageModule,
    ProductDetailModalPageModule,
    ReceivalDetailModalPageModule,
    SaleDetailModalPageModule,
    CustomerCreatePageModule,
    CustomerListModalPageModule,
    CustomerEditModalPageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    NgSelect2Module
   ],
  providers: [
    StatusBar,
    SplashScreen,
    Common,
    Api,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
