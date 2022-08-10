import {Injectable} from '@angular/core';
import {ICON_WARNING} from './alert-const';

declare var $: any;
declare var Swal: any;

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() {
  }

  showNotification(icon, title, message) {
    $(() => {
      Swal.fire({
        icon: icon,
        title: title,
        text: message,
      });
    });
  }

  showConfirmDialog(title, text, resolve, reject) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: `${title}`,
      text: `${text}`,
      icon: ICON_WARNING,
      showCancelButton: true,
      confirmButtonText: 'OK!',
      cancelButtonText: 'Cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        resolve();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        reject();
      }
    });
  }
}
