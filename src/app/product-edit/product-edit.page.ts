import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Common } from '../services/common';
import { Api } from '../services/api';
import { Options } from 'select2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {

  public submitAttempt: boolean = false;
  public createForm: FormGroup;
  public branches: any = [];
  public mainCategories: any = [];
  public Categories: any = [];
  public SubCategories: any = [];
  public userType: any;
  public defaultBranchName: any = '';
  compareWith: any ;
  public selectedBranches: any = [];
  public selectedMainCategory: any = '';
  public selectedCategory: any = '';
  public productFields: any = [];
  public brands: any = [];
  public relatedProducts: any = [];
  public selectedRealtedProducts: any = [];
  public warranty: any = [];
  public updateData: any = false;
  public selectedBrand: any = '';
  public selectedSubCategory: any = '';
  public loader: any = false;
  public selectedRefurbType: any = '';
  public costvalError: any = false;
  public refurbReadonly: any = true;
  public extraWarranties: any = [];
  public selectedExtraWarranty: any = [];
  public Cloading: any = false;
  public options: Options;

  constructor(public alertCtrl:AlertController, public location:Location,public route: Router, public api: Api, public common: Common, public menuCtrl: MenuController, public storage: Storage, public formBuilder: FormBuilder) {
    this.createForm = formBuilder.group({
      main_category_id: ['', Validators.compose([Validators.maxLength(224), Validators.required])],
      category_id:['', Validators.compose([Validators.maxLength(224), Validators.required])],
      sub_category_id:['', Validators.compose([Validators.maxLength(224)])],
      branch_id: ['', Validators.compose([Validators.maxLength(224), Validators.required])],
      brand_id: ['', Validators.compose([Validators.maxLength(224), Validators.required])],
      model_number: ['', Validators.compose([Validators.maxLength(224), Validators.required])],
      cost: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(224), Validators.required])],
      refurb_cost: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.maxLength(224)])],
      suggested_buy_1: ['', Validators.compose([Validators.maxLength(224)])],
      features: ['', Validators.compose([Validators.maxLength(224)])],
      warranty_1: ['', Validators.compose([Validators.maxLength(224)])],
      total_cost: ['', Validators.compose([Validators.maxLength(224)])],
      refurb_cost_type: ['', Validators.compose([Validators.maxLength(224)])],
      warranty_with_product: ['', Validators.compose([Validators.maxLength(224)])],
      warranty_ids: ['', Validators.compose([Validators.maxLength(224)])],
    });
    storage.get('user_type').then((val: any) => {
      if (val) {
        this.userType = val;
      }
    });
  }
  change_refurb_type(evt) {
    this.selectedRefurbType = evt.target.value;
    let costval =  this.createForm.value['cost'];
    if (costval === '') {
      this.costvalError = true;
      this.createForm.controls['refurb_cost_type'].reset();
    } else {
      this.costvalError = false;
      this.refurbReadonly = false;
      let refurbcost_val =  this.createForm.value['refurb_cost'];
      if (this.selectedRefurbType === 'flat') {
        this.createForm.controls['total_cost'].setValue( (Number(costval)  +  Number(refurbcost_val)) );
      } else {
        this.createForm.controls['total_cost'].setValue( Number(costval) + Number( ((costval  *  refurbcost_val) / 100)) );
      }
    }
  }
  change_refurb_cost(evt) {
    let refurbcost_val =  evt.target.value;
    let costval =  this.createForm.value['cost'];
    if (this.selectedRefurbType === 'flat') {
      this.createForm.controls['total_cost'].setValue( (Number(costval)  +  Number(refurbcost_val)) );
    }else{
      this.createForm.controls['total_cost'].setValue( Number(costval) + Number( ((costval  *  refurbcost_val) / 100)) );
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.warranty  = [];
    this.warranty.push(1);
    this.storage.get('product_edit').then((resp: any) => {
      this.createForm.controls['model_number'].setValue(resp.model_number);
      this.createForm.controls['cost'].setValue(resp.cost);

      this.createForm.controls['refurb_cost'].setValue(resp.refurb_cost);

      this.createForm.controls['features'].setValue(resp.features);

      this.createForm.controls['total_cost'].setValue(resp.total_cost);
      this.createForm.controls['refurb_cost_type'].setValue(resp.refurb_cost_type);
      this.createForm.controls['warranty_with_product'].setValue(resp.warranty_with_product);
      this.updateData = resp;
    });

    this.storage.get('more_data').then((data: any) => {
       if (data.branches.length > 0) {

        this.branches = data.branches;
      }
      this.storage.get('product_edit').then((resp: any) => {
        this.createForm.controls['branch_id'].setValue(resp.branches_arr);
        this.selectedBranches = resp.branches_arr;
        if (resp.warranty_decode.length !== 0 ) {
          for (let i = 0; i < resp.warranty_decode.length ; i++) {
            if ((i + 1) === 1) {
              //if one row only assign value not create validation
              this.createForm.controls['warranty_' + (i+1)].setValue(resp.warranty_decode[i]);
            } else {
              this.warranty.push(1);
              this.createForm.addControl('warranty_' + (i+1), new FormControl('', Validators.required));
              this.createForm.controls['warranty_' + (i+1)].setValue(resp.warranty_decode[i]);
            }
          }
        }
      });
    });

    // this.warranty = [];
    
   }
  compareWithFn(o1, o2) {
    return o1 === o2;
  }
  addWarrany() {
    this.warranty.push(1);
    this.createForm.addControl('warranty_' + this.warranty.length, new FormControl('', Validators.required));
  }
  removeWarranty() {
    let i = (this.warranty.length - 1);
    if (i !== -1 && i > 0) {
       this.createForm.removeControl('warranty_' + i);
      this.warranty.splice(i, 1);
    }
  }
  onCancel() {
    console.log('cancel clicked');
    if (this.selectedBranches.length > 0) {
      this.selectedBranches = [];
    } else {
      this.branches.forEach(obj => {
        this.selectedBranches.push(""+obj.branch_id+"");
      });
    }
  this.createForm.controls['branch_id'].setValue(this.selectedBranches);
  // this.change_branch();
}
onCancelsuggestedbuy() {
  if (this.selectedRealtedProducts.length > 0) {
    this.selectedRealtedProducts = [];
  } else {
    this.relatedProducts.forEach(obj => {
      this.selectedRealtedProducts.push(""+obj.product_id+"");
    });
  }
this.createForm.controls['suggested_buy_1'].setValue(this.selectedRealtedProducts);
}

  change_branch(evt) {
    this.selectedBranches = evt.target.value;
    if (this.selectedBranches != null && this.selectedBranches.length !== '0') {
      this.Cloading = true;
      this.api.search('/product-category/search', {search:'', branch_id : this.selectedBranches, parent_id: null }).then((res: any) => {
        this.Cloading = false;
        if (res.status === 'success') {
            this.mainCategories = res.data;
            this.storage.get('product_edit').then((resp: any) => {
            this.createForm.controls['main_category_id'].setValue(resp.product_category_id);
              this.selectedMainCategory = resp.product_category_id;
            });
            this.api.search('/brand/search', {search:'', branch_id : this.selectedBranches }).then((res_brands: any) => {
              if (res_brands.status === 'success') {
                this.brands = res_brands.data;
                this.storage.get('product_edit').then((resp: any) => {
                  console.log('resp', resp);
                  this.createForm.controls['brand_id'].setValue(resp.brand_id);
                  this.selectedBrand = resp.brand_id;
                });
              }
            });
           

            this.loader = true;
            this.api.search('/warranty-master/search', {search:'', branch_id : this.selectedBranches }).then((extra_warranty: any) => {
              if (extra_warranty.status === 'success') {
                this.extraWarranties = extra_warranty.data;
                this.loader = false;
                this.storage.get('product_edit').then((resp: any) => {
                  this.createForm.controls['warranty_ids'].setValue(resp.get_warranties_arr);
                  this.selectedExtraWarranty = resp.get_warranties_arr;
                });
              }
          });
         } else if (res.status === 'errors') {
            this.common.presentToast('Server Error');
         }
       });
    }
  }
  change_main_category(evt) {
    this.selectedMainCategory = evt.target.value;
    if (this.selectedBranches != null && this.selectedMainCategory!=null && this.selectedBranches.length !== 0 && this.selectedMainCategory !== '' && this.selectedMainCategory !== '0') {
      // this.common.start_loading();
      this.loader = true;
      this.api.search('/product-category/search', {search:'', branch_id : this.selectedBranches, parent_id: this.selectedMainCategory }).then((res: any) => {
      //  this.common.stop_loading().then(() => {
        this.loader = false;
        if (res.status === 'success') {
           this.Categories = res.data;
           this.storage.get('product_edit').then((resp: any) => {
            this.selectedCategory = resp.category_id;
            this.createForm.controls['category_id'].setValue(resp.category_id);
         });
         } else if (res.status === 'errors') {
            this.common.presentToast('Server Error');
         }
      //  });
     });
    }
  }

  change_category(evt) {
    console.log('change category');
    // console.log(this.selectedBranches);
    // console.log(this.selectedMainCategory);
    this.selectedCategory = evt.target.value;
    if (this.selectedBranches != null && this.selectedBranches.length !== 0 && this.selectedMainCategory !== '' && this.selectedMainCategory !== '0' &&  this.selectedCategory !== '' && this.selectedCategory !== '0') {
      // this.common.start_loading();
      this.loader = true;
      // remove old dynamic fields rules
      if (this.productFields.length !== 0 ) {
        this.productFields.forEach(obj => {
          if (obj.get_input) {
            this.createForm.removeControl(obj.get_input.name);
          }
        });
        this.productFields = [];
      }
      // remove old dynamic fields rules
      this.api.search('/product-category/search', {search:'', branch_id : this.selectedBranches, parent_id: this.selectedCategory }).then((res: any) => {
        if (res.status === 'success') {
          this.SubCategories = res.data;
          this.storage.get('product_edit').then((resp: any) => {
            this.createForm.controls['sub_category_id'].setValue(resp.sub_category_id);
           this.selectedSubCategory = resp.sub_category_id;
         });
          this.api.search('/product/suggested_product_search', {search:'', branch_id : this.selectedBranches, 'category_id': this.selectedCategory }).then((res_products: any) => {
           if (res_products.status === 'success') {
            //  this.relatedProducts = res_products.data;
            let relatedProducts = [];
            if (res_products.data.length > 0) {
              res_products.data.forEach((objSp: any) => {
                relatedProducts.push(
                 {
                     id: objSp.product_id,
                     text: objSp.model_number
                   }
                );
              });
            }
            this.relatedProducts = relatedProducts;
            this.storage.get('product_edit').then((resp: any) => {
               this.createForm.controls['suggested_buy_1'].setValue(resp.suggested_buy_1_arr);
               this.selectedRealtedProducts = resp.suggested_buy_1_arr;
             });
           }
         });
          this.api.search('/product-fields/assigned-detials_update', {search:'', branch_id : this.selectedBranches, category_id: this.selectedCategory, product_id: this.updateData.product_id }).then((res_fields: any) => {
          // this.common.stop_loading().then(() => {
            this.loader = false;
            this.productFields = res_fields.data;
            if (this.productFields.length !== 0) {
              // this.resetformValidation();
              this.productFields.forEach(obj => {
                if (obj.get_input) {
                  let requriedCtrol = [];
                  if (obj.get_input.is_required === 1) {
                    // let requriedCtrol = Validators.required;
                  }
                  let IntCtrol = [];
                  if (obj.get_input.is_integer === 1) {
                    // let IntCtrol = Validators.pattern('[0-9]*');
                  }

                  this.createForm.addControl(obj.get_input.name, new FormControl('', requriedCtrol, IntCtrol));
                  if (obj.get_input.input_type === 'text' || obj.get_input.input_type === 'dropdown') {
                    this.createForm.controls[obj.get_input.name].setValue(obj.set_value);
                  } else if (obj.get_input.input_type === 'checkbox') {
                    if(obj.set_value){
                      this.createForm.controls[obj.get_input.name].setValue(true);
                    }  else {
                      this.createForm.controls[obj.get_input.name].setValue(false);
                    }
                  }
                }
              });
            }
          // });
        });
        } else if (res.status === 'errors') {
           this.common.presentToast('Server Error');
        }

     });
    }
  }

save() {
if (this.createForm.valid) {
  let data: any = this.createForm.value;
  this.Cloading = true;
  this.api.post('/product/update/' + this.updateData.product_id, data).then((res: any) => {
    // this.common.stop_loading();
    this.Cloading = false;
    if (res.status === 'success') {
      this.common.presentToast('Product Created Successfully');
      this.selectedBranches = [];
      this.selectedMainCategory = '';
      this.mainCategories = [];
      this.selectedCategory = '';
      this.Categories = [];
      this.SubCategories = [];
      this.selectedRealtedProducts  =  [];
      this.selectedExtraWarranty = [];
      this.brands = [];
      this.relatedProducts = [];
      this.extraWarranties = [];
      if (this.productFields.length !== 0 ) {
        this.productFields.forEach(obj => {
          if (obj.get_input) {
            this.createForm.removeControl(obj.get_input.name);
          }
        });
        this.productFields = [];
      }
      this.createForm.controls['model_number'].reset();
      this.createForm.controls['cost'].reset();
      this.createForm.controls['refurb_cost'].reset();
      this.createForm.controls['suggested_buy_1'].reset();
      this.createForm.controls['brand_id'].reset();
      this.createForm.controls['features'].reset();
      this.createForm.controls['total_cost'].reset();

      if (this.warranty.length !== 0 ) {
          for (let i = 0; i < this.warranty.length ; i++) {
            if ((i + 1) === 1) {
              
            } else {
              this.createForm.removeControl('warranty_' + (i + 1));
            }
          }
          this.warranty = [];
      }
      this.route.navigate([ '/product-list' ]);

    } else if (res.status === 'errors') {
        this.common.presentToast('Server Error');
    }
  });
}
}
ngOnInit() {
  this.options = {
    multiple: true,
    // theme: 'classic',
    // closeOnSelect: true,
    width: '200',
    // minimumInputLength: 3,

  };
}
async presentAlertConfirm() {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: 'are you sure !',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Ok',
        handler: () => {
          this.menuCtrl.enable(true);
          this.location.back();
        }
      }
    ]
  });

  await alert.present();
}
change_menu() {
  this.presentAlertConfirm();
}
}
