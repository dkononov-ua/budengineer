import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable()
export class CheckDeviceService {

  private checkIsMobileSubject = new BehaviorSubject<boolean>(false);
  public isMobile$ = this.checkIsMobileSubject.asObservable();


  constructor(private breakpointObserver: BreakpointObserver,
  ) { }

  checkIsMobile() {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      // console.log('Перевіряю пристрій на якому переглядають')
      this.checkIsMobileSubject.next(result.matches);
    });
  }
}
