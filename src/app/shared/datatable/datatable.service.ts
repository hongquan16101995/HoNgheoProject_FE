import {Injectable} from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor() {
  }

  createDatatable(tableId) {
    $(() => {
      $(`#${tableId}`).DataTable({
        paging: true,
        pageLength: 10,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
      });
    });
  }
}
