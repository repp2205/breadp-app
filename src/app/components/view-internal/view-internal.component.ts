import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-view-internal',
  templateUrl: './view-internal.component.html',
  styleUrls: ['./view-internal.component.scss']
})
export class ViewInternalComponent implements OnInit {

  role: string;

  constructor(private router: Router,
              public authService: AuthService,
              private activitedRoute: ActivatedRoute) {
    this.role = '';
  }

  ngOnInit(): void {
    const role = Number(this.activitedRoute.snapshot.queryParams.r);
    this.role = (role === 0) ? 'user' : (role === 1) ? 'admin' : 'super';
  }

  setLanguage(language: string): void {
    this.authService.setLanguage(language);
  }

  logout(): void {
    this.router.navigate(['login']);
  }
}
