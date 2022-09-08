import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../../shared/shared.module";
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';


@NgModule({
  declarations: [HomeComponent, WalletListComponent, TransactionListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
