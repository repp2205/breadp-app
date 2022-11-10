import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-internal',
  templateUrl: './view-internal.component.html',
  styleUrls: ['./view-internal.component.scss']
})
export class ViewInternalComponent implements OnInit {

  role: string;

  constructor(private router: Router, public authService: AuthService) {
    this.role = 'user';
  }

  ngOnInit(): void {

  }

  setLanguage(language: string): void {
    this.authService.setLanguage(language);
  }

  logout(): void {
    this.router.navigate(['login']);
  }
}
