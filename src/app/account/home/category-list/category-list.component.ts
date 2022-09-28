import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoryService} from './model/category.service';
import {SweetalertService} from '../../../shared/sweetalert/sweetalert.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  categoryUpdate: Category;
  formCategory: FormGroup;
  updateId: number;

  constructor(private categoryService: CategoryService,
              private formGroup: FormBuilder,
              private sweetalertService: SweetalertService) { }

  ngOnInit() {
    this.formCategory = this.formGroup.group({
      name: [''],
      description: ['']
    });
    this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    });
  }

  create() {
    const category = {
      name: this.formCategory.value.name,
      description: this.formCategory.value.description,
      status: 1
    };
    this.categoryService.create(category).subscribe(() => {
      this.ngOnInit();
    });
  }
  displayConfirm(id?: number) {
    this.sweetalertService.showConfirmDialog('Remove', 'Bạn chắc chắn muốn xóa?', () => {
      this.categoryService.delete(id).subscribe(() => {
        this.ngOnInit();
      });
    }, false);
  }
  displayUpdate(id?: number) {
    this.categoryService.findById(id).subscribe(data => {
      this.updateId = data.id;
      this.categoryUpdate = data;
      this.formCategory.patchValue(data);
    });
  }
  update() {
    const description = {
      name: this.formCategory.value.name,
      description: this.formCategory.value.description,
      status: this.categoryUpdate.status
    };
    this.categoryService.update(this.updateId, description).subscribe(() => {
      this.ngOnInit();
    });
  }

  updateActive(id: number, status: number) {
    this.categoryService.updateStatus(id, status).subscribe(() => {
      this.ngOnInit();
    });
  }
}
