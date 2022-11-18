import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { ModalRecoverComponent } from './modal/modal.component';
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
              public dialog: MatDialog,
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
      let q = { r: response.role, u: response.id };
      if (response.role === 1) {
        // @ts-ignore
        q.b = response.branchOfficeId;
      } else if (response.role === 2) {
        // @ts-ignore
        q.b = response.bakeryId;
      }
      this.router.navigate(['home'], {
          queryParams: q,
        });
    }, (error: any) => {
      this.toastService.error(this.translateService.instant('ERRORS.USER_PASSWORD'), this.translateService.instant('ERRORS.TITLE'));
    });
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }

  recoverPassword() {
    const dialogRef = this.dialog.open(ModalRecoverComponent, {
      width: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
