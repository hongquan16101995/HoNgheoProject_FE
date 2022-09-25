import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {WalletListComponent} from './wallet-list/wallet-list.component';
import {TransactionListComponent} from './transaction-list/transaction-list.component';
import {CategoryListComponent} from './category-list/category-list.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [

      {
        path: 'wallets',
        component: WalletListComponent
      }, {
        path: 'categories',
        component: CategoryListComponent
      }, {
        path: '',
        component: TransactionListComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
