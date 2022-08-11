import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account/account.service';
import {Router} from '@angular/router';
import {SweetalertService} from '../sweetalert/sweetalert.service';
import {ICON_SUCCESS} from '../sweetalert/alert-const';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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
