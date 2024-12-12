import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false, // компонент є standalone

})
export class HomeComponent implements OnInit {

  constructor(private el: ElementRef,) { }

  ngOnInit() {
    this.scrollToAnchor(0);
  }

  scrollToAnchor(anchor: number): void {
    setTimeout(() => {
      const element = this.el.nativeElement.querySelector(`#conteiner${anchor}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  }

}
