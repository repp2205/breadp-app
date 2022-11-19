import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { CustomValidators } from '../../utils/CustomValidators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide: boolean;
  hideConfirm: boolean;
  formRegister: FormGroup;

  constructor(private router: Router,
              private userService: UserService,
              private toastService: ToastrService,
              private translateService: TranslateService) {
    this.hide = true;
    this.hideConfirm = true;
    const regex = new RegExp('^\\w+([.-_+]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,10})+$');
    const regexString = new RegExp('^[a-zA-Z ]*$');
    const regexNumber = new RegExp('^[0-9]+$');
    this.formRegister = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(regexString)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(regexString)]),
      email: new FormControl('', [Validators.required, Validators.pattern(regex)]),
      phone: new FormControl('', [Validators.minLength(7), Validators.required, Validators.pattern(regexNumber)]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
      confirmPassword: new FormControl('', [Validators.minLength(6), Validators.required]),
      role: new FormControl(0, [Validators.required]),
      status: new FormControl(1, [Validators.required]),
    }, {
      validators: [CustomValidators.match('password', 'confirmPassword')]
    });
  }

  ngOnInit(): void {}

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  register(): void {
    const user = {
      name: this.formRegister.controls.name.value,
      last_name: this.formRegister.controls.lastName.value,
      email: this.formRegister.controls.email.value,
      phone: this.formRegister.controls.phone.value,
      password: btoa(this.formRegister.controls.password.value),
      role: this.formRegister.controls.role.value,
    }
    this.userService.register(user).subscribe((response: any) => {
      this.toastService.success(this.translateService.instant('LABELS.SUCCESS_USER'), this.translateService.instant('LABELS.SUCCESS_USER_TITLE'));
      this.successRegister();
    }, (error: any) => {
      if (error.status === 200) {
        this.successRegister();
      }
      this.toastService.error(error.error.errors[0], this.translateService.instant('ERRORS.TITLE'));
    });
  }

  successRegister() {
    this.toastService.success(this.translateService.instant('LABELS.SUCCESS_USER'), this.translateService.instant('LABELS.SUCCESS_USER_TITLE'));
    setTimeout(() => {
      this.formRegister.reset(true);
      this.router.navigate(['login']);
    }, 3000);
  }
}
