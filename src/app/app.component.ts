import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Api } from './services/api';
import { Common } from './services/common';

import {  } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public openPage: any = 0;
  public openSubPage: any = 0;
  public userType: any = 0;
  public userEmail: any = 0;
  public userRights: any = false;
  public BranchRights: any = false;
  public DepartmentRights: any = false;
  public UsersRights: any = false;

  public SalespersonCommissionRights: any = false;

  public CategoriesRights: any = false;

  public BrandsRights: any = false;

  public ProductsRights: any = false;

  public DropdownsRights: any = false;

  public GradesRights: any = false;
  public DeliveryRights: any = false;

  public DiscrepancyReasonsRights: any = false;
  public ReceivalRights: any = false;
  public SalesRights: any = false;
  public TagMasterRights: any = false;
  public PaymentMethodRights: any = false;
  public WarrantyRights: any = false;
  public InputTypesRight: any = false;
  public MastersRight: any = false;

  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'menu'
    },
   ];
  constructor(
    public common: Common,
    public api: Api,
    public route: Router,
    public storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    console.log('check');
    this.storage.get('user_type').then((val: any) => {
      if (val) {
        this.userType = val;
        console.log('this.userType', this.userType);

      }
    });
    this.storage.get('user').then((val: any) => {
      if (val) {
        this.userEmail = val.user.email;
      }
    });
    this.AssignRights();
  }
  ionViewWillEnter() {
    this.storage.get('user_type').then((val: any) => {
      if (val) {
        this.userType = val;
        console.log('this.userType', this.userType);

      }
    });
    this.storage.get('user').then((val: any) => {
      if (val) {
        this.userEmail = val.user.email;
      }
    });
    // this.AssignRights();
    console.log('check');
  }
  ionViewDidEnter() {
    console.log('check');
  }
  ionViewDidLeave() {
    console.log('check');
  }
  ionViewWillLeave() {
    console.log('runnnnn');
  }
  logout() {
    this.storage.remove('user').then(() => {
         this.route.navigate(['/login']);
     });
  }
 
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // console.log(this.api.ifLoggedIn());

    });
  }
  AssignRights() {
    this.storage.get('user_type').then((val: any) => {
      if (val) {
        this.userType = val;
      }
    });
    this.storage.get('user').then((val: any) => {
      if (val) {
        this.userEmail = val.user.email;
      }
    });
    this.common.getRight('branches').then(val => {
       this.BranchRights = val;
    });
    this.common.getRight('departments').then(val => {
      this.DepartmentRights = val;
   });
    this.common.getRight('users').then(val => {
     this.UsersRights = val;
    });
    this.common.getRight('salesperson_commission').then(val => {
      this.SalespersonCommissionRights = val;
    });
    this.common.getRight('categories').then(val => {
      this.CategoriesRights = val;
   });

    this.common.getRight('products').then(val => {
     this.ProductsRights = val;
  });

    this.common.getRight('brands').then(val => {
      this.BrandsRights = val;
    });

    this.common.getRight('dropdowns').then(val => {
     this.DropdownsRights = val;
    });

    this.common.getRight('grades').then(val => {
      this.GradesRights = val;
    });
    this.common.getRight('discrepancy_reasons').then(val => {
      this.DiscrepancyReasonsRights = val;
    });

    this.common.getRight('receival').then(val => {
      this.ReceivalRights = val;
    });
    this.common.getRight('sales').then(val => {
      this.SalesRights = val;
    });
    this.common.getRight('payment_methods').then(val => {
      this.PaymentMethodRights = val;
    });
    this.common.getRight('tag_master').then(val => {
      this.TagMasterRights = val;
    });
    this.common.getRight('warranty').then(val => {
      this.WarrantyRights = val;
    });
    this.common.getRight('input_types').then(val => {
      this.InputTypesRight = val;
    });

    this.common.getRight('masters').then(val => {
      this.MastersRight = val;
    });
    this.common.getRight('delivery').then(val => {
      this.DeliveryRights = val;
    });
  }
  async ngOnInit() {
    console.log('header app');
    window.addEventListener('user:login', (res) => {
     this.AssignRights();
    });
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
