import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrdersByUser(userId: number): any {
    return this.http.get(`${environment.API_ENDPOINT}/order?userId=${userId}`).pipe(
      map((result: any) => result)
    );
  }

  getOrdersByBranchOffice(branchOfficeId: number): any {
    return this.http.get(`${environment.API_ENDPOINT}/order?branchOfficeId=${branchOfficeId}`).pipe(
      map((result: any) => result)
    );
  }
}
