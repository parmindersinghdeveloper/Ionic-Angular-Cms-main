import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'branch-create',
    loadChildren: () => import('./branch-create/branch-create.module').then( m => m.BranchCreatePageModule)
  },
  {
    path: 'branch-list',
    loadChildren: () => import('./branch-list/branch-list.module').then( m => m.BranchListPageModule)
  },
  {
    path: 'branch-edit',
    loadChildren: () => import('./branch-edit/branch-edit.module').then( m => m.BranchEditPageModule)
  },
  {
    path: 'product-category',
    loadChildren: () => import('./product-category/product-category.module').then( m => m.ProductCategoryPageModule)
  },
  {
    path: 'product-category-create',
    loadChildren: () => import('./product-category-create/product-category-create.module').then( m => m.ProductCategoryCreatePageModule)
  },
  {
    path: 'product-category-edit',
    loadChildren: () => import('./product-category-edit/product-category-edit.module').then( m => m.ProductCategoryEditPageModule)
  },
  {
    path: 'product-create',
    loadChildren: () => import('./product-create/product-create.module').then( m => m.ProductCreatePageModule)
  },
  {
    path: 'product-edit',
    loadChildren: () => import('./product-edit/product-edit.module').then( m => m.ProductEditPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
    path: 'sales-person-list',
    loadChildren: () => import('./sales-person-list/sales-person-list.module').then( m => m.SalesPersonListPageModule)
  },
  {
    path: 'sales-person-create',
    loadChildren: () => import('./sales-person-create/sales-person-create.module').then( m => m.SalesPersonCreatePageModule)
  },
  {
    path: 'sales-person-edit',
    loadChildren: () => import('./sales-person-edit/sales-person-edit.module').then( m => m.SalesPersonEditPageModule)
  },
  {
    path: 'sales-person-dashboard',
    loadChildren: () => import('./sales-person/sales-person-dashboard/sales-person-dashboard.module').then( m => m.SalesPersonDashboardPageModule)
  },
  {
    path: 'brand-create',
    loadChildren: () => import('./brand-create/brand-create.module').then( m => m.BrandCreatePageModule)
  },
  {
    path: 'brand-list',
    loadChildren: () => import('./brand-list/brand-list.module').then( m => m.BrandListPageModule)
  },
  {
    path: 'brand-update',
    loadChildren: () => import('./brand-update/brand-update.module').then( m => m.BrandUpdatePageModule)
  },
  {
    path: 'brand-admin-dashboard',
    loadChildren: () => import('./brand-admin-dashboard/brand-admin-dashboard.module').then( m => m.BrandAdminDashboardPageModule)
  },
  {
    path: 'branch-admin-dashboard',
    loadChildren: () => import('./branch-admin-dashboard/branch-admin-dashboard.module').then( m => m.BranchAdminDashboardPageModule)
  },
  {
    path: 'sales-person-commission',
    loadChildren: () => import('./sales-person-commission/sales-person-commission.module').then( m => m.SalesPersonCommissionPageModule)
  },
  {
    path: 'product-search-modal',
    loadChildren: () => import('./product-search-modal/product-search-modal.module').then( m => m.ProductSearchModalPageModule)
  },
  {
    path: 'user-rights',
    loadChildren: () => import('./user-rights/user-rights.module').then( m => m.UserRightsPageModule)
  },
  {
    path: 'grade-create',
    loadChildren: () => import('./grade-create/grade-create.module').then( m => m.GradeCreatePageModule)
  },
  {
    path: 'grade-edit',
    loadChildren: () => import('./grade-edit/grade-edit.module').then( m => m.GradeEditPageModule)
  },
  {
    path: 'grade-list',
    loadChildren: () => import('./grade-list/grade-list.module').then( m => m.GradeListPageModule)
  },
  {
    path: 'discrepany-reason',
    loadChildren: () => import('./discrepany-reason/discrepany-reason.module').then( m => m.DiscrepanyReasonPageModule)
  },
  {
    path: 'discrepany-reason-create',
    loadChildren: () => import('./discrepany-reason-create/discrepany-reason-create.module').then( m => m.DiscrepanyReasonCreatePageModule)
  },
  {
    path: 'discrepany-reason-edit',
    loadChildren: () => import('./discrepany-reason-edit/discrepany-reason-edit.module').then( m => m.DiscrepanyReasonEditPageModule)
  },
  {
    path: 'unit-id-create',
    loadChildren: () => import('./unit-id-create/unit-id-create.module').then( m => m.UnitIdCreatePageModule)
  },
  {
    path: 'unit-id-edit',
    loadChildren: () => import('./unit-id-edit/unit-id-edit.module').then( m => m.UnitIdEditPageModule)
  },
  {
    path: 'unit-id-list',
    loadChildren: () => import('./unit-id-list/unit-id-list.module').then( m => m.UnitIdListPageModule)
  },
  {
    path: 'model-create',
    loadChildren: () => import('./model-create/model-create.module').then( m => m.ModelCreatePageModule)
  },
  {
    path: 'model-edit',
    loadChildren: () => import('./model-edit/model-edit.module').then( m => m.ModelEditPageModule)
  },
  {
    path: 'model-list',
    loadChildren: () => import('./model-list/model-list.module').then( m => m.ModelListPageModule)
  },
  {
    path: 'receival-create',
    loadChildren: () => import('./receival-create/receival-create.module').then( m => m.ReceivalCreatePageModule)
  },
  {
    path: 'receival-list',
    loadChildren: () => import('./receival-list/receival-list.module').then( m => m.ReceivalListPageModule)
  },
  {
    path: 'op-stock-create',
    loadChildren: () => import('./op-stock-create/op-stock-create.module').then( m => m.OpStockCreatePageModule)
  },
  {
    path: 'op-stock-list',
    loadChildren: () => import('./op-stock-list/op-stock-list.module').then( m => m.OpStockListPageModule)
  },
  {
    path: 'op-stock-edit',
    loadChildren: () => import('./op-stock-edit/op-stock-edit.module').then( m => m.OpStockEditPageModule)
  },
  {
    path: 'product-sub-category-create',
    loadChildren: () => import('./product-sub-category-create/product-sub-category-create.module').then( m => m.ProductSubCategoryCreatePageModule)
  },
  {
    path: 'product-sub-category-edit',
    loadChildren: () => import('./product-sub-category-edit/product-sub-category-edit.module').then( m => m.ProductSubCategoryEditPageModule)
  },
  {
    path: 'department-create',
    loadChildren: () => import('./department-create/department-create.module').then( m => m.DepartmentCreatePageModule)
  },
  {
    path: 'department-edit',
    loadChildren: () => import('./department-edit/department-edit.module').then( m => m.DepartmentEditPageModule)
  },
  {
    path: 'department-list',
    loadChildren: () => import('./department-list/department-list.module').then( m => m.DepartmentListPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'user-edit',
    loadChildren: () => import('./user-edit/user-edit.module').then( m => m.UserEditPageModule)
  },
  {
    path: 'users-edit',
    loadChildren: () => import('./users-edit/users-edit.module').then( m => m.UsersEditPageModule)
  },
  {
    path: 'users-list',
    loadChildren: () => import('./users-list/users-list.module').then( m => m.UsersListPageModule)
  },
  {
    path: 'users-create',
    loadChildren: () => import('./users-create/users-create.module').then( m => m.UsersCreatePageModule)
  },
  {
    path: 'product-sub-child-category',
    loadChildren: () => import('./product-sub-child-category/product-sub-child-category.module').then( m => m.ProductSubChildCategoryPageModule)
  },
  {
    path: 'product-sub-child-category-edit',
    loadChildren: () => import('./product-sub-child-category-edit/product-sub-child-category-edit.module').then( m => m.ProductSubChildCategoryEditPageModule)
  },
  {
    path: 'masters-create/:tbl_name',
    loadChildren: () => import('./masters-create/masters-create.module').then( m => m.MastersCreatePageModule)
  },
  {
    path: 'masters-edit/:tbl_name',
    loadChildren: () => import('./masters-edit/masters-edit.module').then( m => m.MastersEditPageModule)
  },
  {
    path: 'masters-list/:tbl_name',
    loadChildren: () => import('./masters-list/masters-list.module').then( m => m.MastersListPageModule)
  },
  {
    path: 'masters-dashboard',
    loadChildren: () => import('./masters-dashboard/masters-dashboard.module').then( m => m.MastersDashboardPageModule)
  },
  {
    path: 'product-fields-create',
    loadChildren: () => import('./product-fields-create/product-fields-create.module').then( m => m.ProductFieldsCreatePageModule)
  },
  {
    path: 'product-fields-edit',
    loadChildren: () => import('./product-fields-edit/product-fields-edit.module').then( m => m.ProductFieldsEditPageModule)
  },
  {
    path: 'product-fields-list',
    loadChildren: () => import('./product-fields-list/product-fields-list.module').then( m => m.ProductFieldsListPageModule)
  },
  {
    path: 'product-fields-assign/:product_category_id',
    loadChildren: () => import('./product-fields-assign/product-fields-assign.module').then( m => m.ProductFieldsAssignPageModule)
  },
  {
    path: 'product-detail-modal',
    loadChildren: () => import('./product-detail-modal/product-detail-modal.module').then( m => m.ProductDetailModalPageModule)
  },
  {
    path: 'receival-detail-modal',
    loadChildren: () => import('./receival-detail-modal/receival-detail-modal.module').then( m => m.ReceivalDetailModalPageModule)
  },
  {
    path: 'receival-edit',
    loadChildren: () => import('./receival-edit/receival-edit.module').then( m => m.ReceivalEditPageModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)
  },
  {
    path: 'customer-create',
    loadChildren: () => import('./customer-create/customer-create.module').then( m => m.CustomerCreatePageModule)
  },
  {
    path: 'customer-edit',
    loadChildren: () => import('./customer-edit/customer-edit.module').then( m => m.CustomerEditPageModule)
  },
  {
    path: 'payment-method-create',
    loadChildren: () => import('./payment-method-create/payment-method-create.module').then( m => m.PaymentMethodCreatePageModule)
  },
  {
    path: 'payment-method-edit',
    loadChildren: () => import('./payment-method-edit/payment-method-edit.module').then( m => m.PaymentMethodEditPageModule)
  },
  {
    path: 'payment-method-list',
    loadChildren: () => import('./payment-method-list/payment-method-list.module').then( m => m.PaymentMethodListPageModule)
  },
  {
    path: 'sales-create',
    loadChildren: () => import('./sales-create/sales-create.module').then( m => m.SalesCreatePageModule)
  },
  {
    path: 'sales-edit',
    loadChildren: () => import('./sales-edit/sales-edit.module').then( m => m.SalesEditPageModule)
  },
  {
    path: 'sales-list',
    loadChildren: () => import('./sales-list/sales-list.module').then( m => m.SalesListPageModule)
  },
  {
    path: 'sale-detail-modal',
    loadChildren: () => import('./sale-detail-modal/sale-detail-modal.module').then( m => m.SaleDetailModalPageModule)
  },
  {
    path: 'warranty-create',
    loadChildren: () => import('./warranty-create/warranty-create.module').then( m => m.WarrantyCreatePageModule)
  },
  {
    path: 'warranty-edit',
    loadChildren: () => import('./warranty-edit/warranty-edit.module').then( m => m.WarrantyEditPageModule)
  },
  {
    path: 'warranty-list',
    loadChildren: () => import('./warranty-list/warranty-list.module').then( m => m.WarrantyListPageModule)
  },
  {
    path: 'customer-list-modal',
    loadChildren: () => import('./customer-list-modal/customer-list-modal.module').then( m => m.CustomerListModalPageModule)
  },
  {
    path: 'price-tag-create',
    loadChildren: () => import('./price-tag-create/price-tag-create.module').then( m => m.PriceTagCreatePageModule)
  },
  {
    path: 'price-tag-edit',
    loadChildren: () => import('./price-tag-edit/price-tag-edit.module').then( m => m.PriceTagEditPageModule)
  },
  {
    path: 'price-tag-list',
    loadChildren: () => import('./price-tag-list/price-tag-list.module').then( m => m.PriceTagListPageModule)
  },
  {
    path: 'customer-create2',
    loadChildren: () => import('./customer-create2/customer-create2.module').then( m => m.CustomerCreate2PageModule)
  },
  {
    path: 'customer-list',
    loadChildren: () => import('./customer-list/customer-list.module').then( m => m.CustomerListPageModule)
  },
  {
    path: 'delivery-list',
    loadChildren: () => import('./delivery-list/delivery-list.module').then( m => m.DeliveryListPageModule)
  },
  {
    path: 'delivery-create',
    loadChildren: () => import('./delivery-create/delivery-create.module').then( m => m.DeliveryCreatePageModule)
  },
  {
    path: 'customer-edit-modal',
    loadChildren: () => import('./customer-edit-modal/customer-edit-modal.module').then( m => m.CustomerEditModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('check ing');
  }
}
