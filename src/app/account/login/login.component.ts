import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SweetalertService} from '../../shared/sweetalert/sweetalert.service';
import {first} from 'rxjs/operators';
import {ICON_ERROR} from '../../shared/sweetalert/alert-const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  returnUrl: string;

  constructor(private accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private sweetalertService: SweetalertService) {
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  login() {
    this.accountService.login(this.loginForm.value).pipe(first())
      .subscribe(
        (user) => {
          const roleList = user.authorities;
          let hasRoleAdmin = false;
          for (const role of roleList) {
            if (role.authority === 'ROLE_ADMIN') {
              hasRoleAdmin = true;
              break;
            }
          }
          if (hasRoleAdmin) {
            this.router.navigateByUrl('/backyard');
          } else {
            this.router.navigate([this.returnUrl]).finally(() => {
            });
          }
        },
      (error) => {
          this.sweetalertService.showNotification(ICON_ERROR, 'Lỗi', 'Tài khoản hoặc mật khẩu không đúng!');
          console.log(error);
        });
  }
}
