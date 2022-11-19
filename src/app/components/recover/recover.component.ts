import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CustomValidators } from '../../utils/CustomValidators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  hide: boolean;
  userId: number;
  hideConfirm: boolean;
  formRecover: FormGroup;

  constructor(private router: Router,
              private userService: UserService,
              private toastService: ToastrService,
              private activitedRoute: ActivatedRoute,
              private translateService: TranslateService) {
    this.hide = true;
    this.userId = 0;
    this.hideConfirm = true;
    this.formRecover = new FormGroup({
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
      confirmPassword: new FormControl('', [Validators.minLength(6), Validators.required]),
    }, {
      validators: [CustomValidators.match('password', 'confirmPassword')]
    });

  }

  ngOnInit(): void {
    this.userId = Number(this.activitedRoute.snapshot.queryParams.id);
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  recoverPassword() {
    const body = { password: btoa(this.formRecover.controls.password.value) };
    this.userService.updatePassword(this.userId, body).subscribe(() => {
      this.successRecover();
    }, (error: any) => {
      if (error.status === 200) {
        this.successRecover();
      }
      this.toastService.error(this.translateService.instant('ERRORS.RECOVER_FAILED'), this.translateService.instant('LABELS.RECOVER_PASSWORD'))
    });
  }

  successRecover() {
    this.toastService.success(this.translateService.instant('LABELS.RECOVER_SUCCESS'), this.translateService.instant('LABELS.RECOVER_PASSWORD'));
    setTimeout(() => {
      this.formRecover.reset(true);
      this.router.navigate(['login']);
    }, 3000);
  }
}
