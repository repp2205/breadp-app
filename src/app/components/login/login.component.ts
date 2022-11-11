import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean;
  formLogin: FormGroup;

  constructor(private router: Router,
              private userService: UserService,
              private toastService: ToastrService,
              private translateService: TranslateService) {
    this.hide = true;
    const regex = new RegExp('^\\w+([.-_+]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,10})+$');
    this.formLogin = new FormGroup({
        user: new FormControl('', [Validators.required, Validators.pattern(regex)]),
        password: new FormControl('', [Validators.minLength(6), Validators.required]),
      },
    );
  }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login(this.formLogin.controls.user.value, btoa(this.formLogin.controls.password.value)).subscribe((response: any) => {
      this.router.navigate(['home'], {
          queryParams: { r: response.role, u: response.id },
        });
    }, (error: any) => {
      this.toastService.error(this.translateService.instant('ERRORS.USER_PASSWORD'), this.translateService.instant('ERRORS.TITLE'));
    });
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }

}
