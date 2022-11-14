import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BakeryService {

  constructor(private http: HttpClient) { }

  getBakerys(): any {
    return this.http.get(`${environment.API_ENDPOINT}/bakery`).pipe(
      map((result: any) => result)
    );
  }

  getBranchOfficeByBakery(bakeryId: number) {
    return this.http.get(`${environment.API_ENDPOINT}/bakery/${bakeryId}`).pipe(
      map((result: any) => result)
    );
  }
}
