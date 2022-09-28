import { Component, OnInit } from '@angular/core';
import {WalletService} from './model/wallet.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SweetalertService} from '../../../shared/sweetalert/sweetalert.service';
import {ICON_SUCCESS, ICON_WARNING} from '../../../shared/sweetalert/alert-const';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {
  wallets: Wallet[] = [];
  walletUpdate: Wallet;
  formWallet: FormGroup;
  updateId: number;

  constructor(private walletService: WalletService,
              private formGroup: FormBuilder,
              private sweetalertService: SweetalertService) { }

  ngOnInit() {
    this.formWallet = this.formGroup.group({
      name: [''],
      money: ['']
    });
    this.walletService.findAll().subscribe(data => {
      this.wallets = data;
    });
  }

  create() {
    const wallet = {
      icon: 'demo.jpg',
      name: this.formWallet.value.name,
      money: this.formWallet.value.money,
      status: 1
    };
    this.walletService.create(wallet).subscribe(() => {
      this.ngOnInit();
    });
  }
  displayConfirm(id?: number) {
    this.sweetalertService.showConfirmDialog('Remove', 'Bạn chắc chắn muốn xóa?', () => {
      this.walletService.delete(id).subscribe(() => {
        this.ngOnInit();
      });
    }, false);
  }
  displayUpdate(id?: number) {
    this.walletService.findById(id).subscribe(data => {
      this.updateId = data.id;
      this.walletUpdate = data;
      this.formWallet.patchValue(data);
    });
  }
  update() {
    const wallet = {
      icon: 'demo.jpg',
      name: this.formWallet.value.name,
      money: this.formWallet.value.money,
      status: 1
    };
    this.walletService.update(this.updateId, wallet).subscribe(() => {
      this.ngOnInit();
    });
  }
}
