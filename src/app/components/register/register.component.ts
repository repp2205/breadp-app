import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router) {
    this.hide = true;
    this.hideConfirm = true;
    const regex = new RegExp('^\\w+([.-_+]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,10})+$');
    this.formRegister = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(regex)]),
      phone: new FormControl('', [Validators.minLength(6), Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
      confirmPassword: new FormControl('', [Validators.minLength(6), Validators.required]),
      role: new FormControl(0, [Validators.required]),
      status: new FormControl(1, [Validators.required]),
    }, {
      validators: [CustomValidators.match('password', 'confirmPassword')]
    });
  }

  ngOnInit(): void {
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }
}
