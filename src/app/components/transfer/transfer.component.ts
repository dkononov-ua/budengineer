
  import { Component, OnInit } from '@angular/core';
  import { animations } from '../../../app/interface/animation';

  @Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.scss'],
    standalone: false,
    animations: [
      animations.bot,
      animations.bot3,
      animations.top,
      animations.top1,
      animations.top2,
      animations.top3,
      animations.top4,
      animations.bot5,
      animations.left,
      animations.left1,
      animations.left2,
      animations.left3,
      animations.left4,
      animations.left5,
      animations.right1,
      animations.swichCard,
      animations.appearance,
      animations.fadeIn,
    ],
  })
  export class TransferComponent implements OnInit {

    carusel = [
      { png: '1.svg', name: 'Передача інформації по Актам', description: 'При замовленні послуги формування актів на закриття прихованих робіт інформація передається в такому форматі' },
      { png: '2.svg', name: 'Передача інформації по Схемам', description: 'При замовленні послуги креслення схем виконаних робіт інформація передається в такому форматі' },
      { png: '3.svg', name: 'Передача інформації по Актам і Схемам', description: 'При замовленні послуги формування актів на закриття прихованих робіт та креслення схем виконаних робіт інформація передається в такому форматі' },
    ];

    imgPath: string = 'transfer/';
    currentIndex: number = 0;
    toogleCarusel: boolean = true;
    isPaused = false;
    autoPlayInterval: any;

    constructor() { }

    ngOnInit() {
      this.autoPlay();
    }

    nextItem() {
      if (this.currentIndex < this.carusel.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Повернення до початку
      }
      this.changeAnimation();
    }

    prevItem() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.carusel.length - 1; // Перехід до останнього зображення
      }
      this.changeAnimation();
    }

    changeAnimation() {
      this.toogleCarusel = false;
      setTimeout(() => {
        this.toogleCarusel = true;
      }, 300); // Затримка для анімації
    }

    autoPlay() {
      this.autoPlayInterval = setInterval(() => {
        if (!this.isPaused) {
          this.nextItem();
        }
      }, 5000); // Інтервал автопрокрутки
    }

    pauseAutoPlay() {
      this.isPaused = true;
    }

    resumeAutoPlay() {
      this.isPaused = false;
    }

    ngOnDestroy() {
      // Очищення інтервалу при знищенні компонента
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
      }
    }
    goToItem(index: number) {
      this.currentIndex = index;
    }

  }
