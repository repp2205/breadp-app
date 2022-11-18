import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ModalComponent } from '../../bakery/modal/modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalRecoverComponent implements OnInit {

  formRecover: FormGroup;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              private userService: UserService,
              private toastService: ToastrService,
              private translateService: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    const regex = new RegExp('^\\w+([.-_+]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,10})+$');
    this.formRecover = new FormGroup({
        user: new FormControl('', [Validators.required, Validators.pattern(regex)]),
      }
    );
  }

  ngOnInit(): void {}

  recoverPassword() {
    this.userService.recoverUser(this.formRecover.controls.user.value).subscribe((response: any) => {
      this.success();
    }, (error: any) => {
      if (error.status === 200) {
        this.success();
      } else {
        this.toastService.error(this.translateService.instant('ERRORS.RECOVER_SEND'), this.translateService.instant('ERRORS.TITLE'));
      }
    });
  }

  success() {
    this.toastService.success(this.translateService.instant('LABELS.RECOVER_SEND_SUCCESS'), this.translateService.instant('LABELS.RECOVER_SEND_SUCCESS_TITLE'));
    setTimeout(() => {
      this.dialogRef.close();
    },2000);
  }

}
