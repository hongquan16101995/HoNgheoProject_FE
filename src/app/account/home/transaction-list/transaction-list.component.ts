import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TransactionService} from './model/transaction.service';
import {SweetalertService} from '../../../shared/sweetalert/sweetalert.service';
import {CategoryService} from '../category-list/model/category.service';
import {WalletService} from '../wallet-list/model/wallet.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];
  wallets: Wallet[] = [];
  transactionUpdate: Transaction;
  formTransaction: FormGroup;
  dateForm: FormGroup
  updateId: number;

  constructor(private transactionService: TransactionService,
              private categoryService: CategoryService,
              private walletService: WalletService,
              private formGroup: FormBuilder,
              private sweetalertService: SweetalertService) {
  }

  ngOnInit() {
    this.formTransaction = this.formGroup.group({
      total: [''],
      description: [''],
      category: [''],
      wallet: ['']
    });
    this.dateForm = this.formGroup.group({
      start: [''],
      end: ['']
    });
    this.transactionService.findAll().subscribe(data => {
      this.transactions = data;
    });
    this.categoryService.findAllByStatus().subscribe(data => {
      this.categories = data;
    });
    this.walletService.findAllByStatus().subscribe(data => {
      this.wallets = data;
    });
  }

  create() {
    const transaction = {
      total: this.formTransaction.value.total,
      description: this.formTransaction.value.description,
      categories: [
        {
          id: this.formTransaction.value.category
        }
      ]
    };
    this.transactionService.create(this.formTransaction.value.wallet, transaction).subscribe(() => {
      this.ngOnInit();
    });
  }

  displayConfirm(id?: number) {
    this.sweetalertService.showConfirmDialog('Remove', 'Bạn chắc chắn muốn xóa?', () => {
      this.transactionService.delete(id).subscribe(() => {
        this.ngOnInit();
      });
    }, false);
  }

  displayUpdate(id?: number) {
    this.transactionService.findById(id).subscribe(data => {
      this.updateId = data.id;
      this.transactionUpdate = data;
      this.formTransaction.patchValue(data);
    });
  }

  update() {
    const transaction = {
      total: this.formTransaction.value.total,
      description: this.formTransaction.value.description,
      categories: [
        {
          id: this.formTransaction.value.category
        }
      ]
    };
    this.transactionService.update(this.updateId, transaction).subscribe(() => {
      this.ngOnInit();
    });
  }

  searchByDate() {
    const search = {
      start: this.dateForm.value.start,
      end: this.dateForm.value.end
    };
    this.transactionService.searchByDate(search).subscribe(data => {
      this.transactions = data;
    });
  }
}
