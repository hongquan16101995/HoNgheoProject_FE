import {Component, OnInit} from '@angular/core';
import {DatatableService} from '../../../shared/datatable/datatable.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private datatableService: DatatableService) {
  }

  ngOnInit() {
    this.initDatatable();
  }

  initDatatable() {
    this.datatableService.createDatatable('example');
  }

}
