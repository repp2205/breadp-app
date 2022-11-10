import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean;
  formLogin: FormGroup;

  constructor(private router: Router) {
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
    this.router.navigate(['home']);
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }

}
