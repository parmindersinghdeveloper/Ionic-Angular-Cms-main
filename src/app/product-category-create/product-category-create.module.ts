import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCategoryCreatePageRoutingModule } from './product-category-create-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductCategoryCreatePage } from './product-category-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProductCategoryCreatePageRoutingModule
  ],
  declarations: [ProductCategoryCreatePage]
})
export class ProductCategoryCreatePageModule {}
