import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private orderSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  order$: Observable<any> = this.orderSubject.asObservable();

  public set order(value: string) {
    this.orderSubject.next(value);
  }

  public get order(): string {
    return this.orderSubject.getValue();
  }
}
