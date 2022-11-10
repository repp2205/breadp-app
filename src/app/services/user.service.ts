import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): any {
    return this.http.get(`${environment.API_ENDPOINT}/user?email=${email}&password=${password}`).pipe(
      map((result: any) => result)
    );
  }

  register(user: any): any {
    return this.http.post(`${environment.API_ENDPOINT}/user`, user).pipe(
      map((result: any) => result)
    );
  }

}
