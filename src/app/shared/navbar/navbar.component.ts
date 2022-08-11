import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../account/account.service';
import {Router} from '@angular/router';
import {SweetalertService} from '../sweetalert/sweetalert.service';
import {ICON_SUCCESS} from '../sweetalert/alert-const';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private accountService: AccountService,
              private router: Router,
              private sweetalertService: SweetalertService) {
  }

  ngOnInit() {
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login').then(() => {
      this.sweetalertService.showNotification(ICON_SUCCESS, 'Thành công!', 'Đăng xuất thành công!')
    });
  }
}
