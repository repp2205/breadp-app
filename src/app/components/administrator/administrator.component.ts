import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  role: number;

  constructor(private activitedRoute: ActivatedRoute) {
    this.role = 0;
  }

  ngOnInit(): void {
    this.role = Number(this.activitedRoute.snapshot.queryParams.r)
  }

}
