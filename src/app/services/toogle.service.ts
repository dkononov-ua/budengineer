import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToogleService {

  private toogleBasketSubject = new BehaviorSubject<boolean>(false);
  public toogleBasket$ = this.toogleBasketSubject.asObservable();

  private toogleProfileSubject = new BehaviorSubject<boolean>(false);
  public toogleProfile$ = this.toogleProfileSubject.asObservable();


  constructor() { }

  toogleBasket(status: boolean) {
    // console.log(status)
    this.toogleBasketSubject.next(status);
  }

  toogleProfile(status: boolean) {
    // console.log(status)
    this.toogleProfileSubject.next(status);
  }




}
