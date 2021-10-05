import { Component, OnInit, ViewChild  } from '@angular/core';
import { Common } from '../services/common';
import { Api } from '../services/api';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.page.html',
  styleUrls: ['./product-category.page.scss'],
})
export class ProductCategoryPage implements OnInit {
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public list: any[] = [];
  public searchTerm: any = '';
  public nextPage: any = 1;
  public listCount: any = 0;
  public searchTermLoading: any = false;
  public userType: any;
  public selectedBranches: any = [];
  public FilterCategoryId: any = '';
  public FilterParentCategoryId: any = '';
  compareWith: any ;
  public branches: any = [];
  public mainCategories: any = [];
  public Categories: any = [];
  public selectedCategory: any = '';
  public selectedMainCategory: any = '';
  public UsersRights: any = false;
  public Cloading: any = false;
  public isModuleAdmin: any = false;
   constructor(public actionSheet: ActionSheetController, public route: Router, public api: Api, public common: Common, public storage: Storage) { 
    storage.get('more_data').then((data: any) => {
      if (data.branches.length > 0) {
        this.branches = data.branches;
        // set default selected branches
        this.branches.forEach((obj: any) => {
          if (obj.branch_id === 1 || obj.branch_id === 39) {
            this.selectedBranches.push(""+obj.branch_id+"");
          }
        });
      }
  });
    this.common.getRight('categories').then((val: any) => {
      this.UsersRights = val;
      if (val.admin) {
        this.isModuleAdmin  = true;
      }
    });
    this.storage.get('user_type').then((val: any) => {
      if (val) {
        this.userType = val;
      }
    });
  }

compareWithFn(o1, o2) {
  return o1 === o2;
}
  change_branch() {
    this.nextPage = 1;
    this.listCount = 0;
    this.list = [];
    this.mainCategories = [];
    this.Categories = [];
    this.selectedMainCategory =  '';
    this.FilterParentCategoryId = '';
    this.FilterCategoryId = '';
    // this.selectedBranches =  evt.target.value;
    this.selectedCategory = '';
    if (this.selectedBranches !== '') {
      this.api.search('/product-category/search', {search: '', branch_id: this.selectedBranches, parent_id : null, isModuleAdmin: this.isModuleAdmin}).then((res: any) => {
        if (res.status === 'success') {
          this.mainCategories = res.data;

        } else if (res.status === 'errors') {
            this.common.presentToast('Server Error');
        }
    });
    }
    this.search();
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
    this.change_branch();
 }
  change_main_category(evt) {
    this.nextPage = 1;
    this.listCount = 0;
    this.list = [];
    this.FilterCategoryId  = '';
    this.Categories = [];
    this.selectedCategory = '';
    this.selectedMainCategory =  evt.target.value;
    this.FilterParentCategoryId = evt.target.value;
    if (this.selectedBranches.length !== 0) {
      this.api.search('/product-category/search', {search: '', branch_id: this.selectedBranches, parent_id : evt.target.value, isModuleAdmin: this.isModuleAdmin}).then((res: any) => {
        if (res.status === 'success') {
          this.Categories = res.data;
        } else if (res.status === 'errors') {
            this.common.presentToast('Server Error');
        }
    });
    }
    this.search();
  }
  change_category(evt) {
    this.nextPage = 1;
    this.listCount = 0;
    this.list = [];
    this.FilterCategoryId = evt.target.value;
    // if (this.selectedBranches !== '') {
    //   this.api.search('/product-category/search', {search: '', branch_id: this.selectedBranches, parent_id : evt.target.value}).then((res: any) => {
    //     if (res.status === 'success') {
    //       this.Categories = res.data;
    //     } else if (res.status === 'errors') {
    //         this.common.presentToast('Server Error');
    //     }
    // });
    // }
    if(this.FilterCategoryId !== '') {
      this.search();
    }
  }
  ngOnInit() {
    // console.log('search api start');
    // this.search();
  }
  ionViewWillEnter() {
    console.log('search api start2');
    this.nextPage = 1;
    this.listCount = 0;
    this.storage.get('user_type').then((val: any) => {
      if (val) {
        this.userType = val;
      }
    });
    this.storage.get('user').then((val: any) => {
      if (val) {
        this.userType = val.user.user_type;
        if (val.user.user_type === 'branchadmin') {
          this.selectedBranches = val.user.branch_id;
          } else {
          this.search();
        }
      }
    });
   }
   async presentActionSheet(item: any, selected: any, level: any) {
    const actionSheet = await this.actionSheet.create({
      header: 'Actions',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          if (this.UsersRights.trash || this.userType=='admin') {
          } else {
            this.common.presentErrorToast('No Right');
          }
           // this.common.start_loading();
          // this.api.post('/product-category/delete/' + item.product_category_id, {}).then((res: any) => {
          //    if (res.status === 'success') {
          //     this.common.stop_loading().then(() => {
          //     if (selected > -1) {
          //         this.list.splice(selected, 1);
          //         console.log(this.list);
          //     }
          //     });
          //     // this.route.navigate([ '/branch-list' ]);
          //   } else if (res.status === 'errors') {
          //     this.common.presentToast('Server Error');
          //   }
          // });
          // this.api.delete(item)

        }
      }, {
        text: 'Edit',
        icon: 'share',
        handler: () => {
          if (this.UsersRights.edit || this.userType=='admin') {
            this.storage.set('category_edit', item).then((resp: any) => {
              if (level === 'main_category') {
                this.route.navigate([ '/product-category-edit' ]);
              } else if (level === 'category') {
                this.route.navigate([ '/product-sub-category-edit' ]);
              } else {
                this.route.navigate([ '/product-sub-child-category-edit' ]);
              }
            });
          } else {
          this.common.presentErrorToast('No Right');
        }
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  setFilteredItems() {
    const searchTerm = this.searchTerm;
    this.searchTermLoading = true;
    let searchParams =  {
      search : searchTerm,
      branch_id : this.selectedBranches,
      parent_id: this.FilterCategoryId,
      isModuleAdmin: this.isModuleAdmin,
    };
    if (this.userType === 'branchadmin') {
      searchParams.branch_id = this.selectedBranches;
    }
    this.api.search('/product-category/search', searchParams).then((res: any) => {
      this.searchTermLoading = false;
      if (res.status === 'success') {
        this.list = res.data;
          // this.route.navigate([ '/branch-list' ]);
      } else if (res.status === 'errors') {
        this.common.presentToast('Server Error');
      }
    });
  }
  search() {
    // this.common.start_loading();
    this.searchTermLoading = true;
    let searchParams =  {
      page : this.nextPage,
      branch_id : this.selectedBranches,
      filter_product_category_id: this.FilterCategoryId,
      filter_main_product_category_id: this.FilterParentCategoryId,
      isModuleAdmin: this.isModuleAdmin,
    };
    if (this.userType === 'BRANCHADMIN') {
        searchParams.branch_id = this.selectedBranches;
    }

    this.api.search('/product-category/search-tree', searchParams).then((res: any) => {
        this.searchTermLoading = false;
        if (res.status === 'success') {
          console.log(res.data);
          this.nextPage += 1;
          for (let i = 0; i < res.data.length; i++) {
            this.list[this.listCount] = res.data[i];
            this.listCount += 1;
          }
          console.log(this.list);
          // this.listCount += res.data.data.length;
        } else if (res.status === 'errors') {
           this.common.presentToast('Server Error');
        }
     });
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.search();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }


}
