import { Component, OnInit } from '@angular/core';
import { animations } from '../../../app/interface/animation';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
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
export class ProcessComponent implements OnInit {

  carusel = [
    { png: '1.svg', name: 'Обрання потрібної послуги', description: 'Оберіть послугу із тих які запропоновані на сайті додайте їх в кошик, опишіть та сформуйте завдання' },
    { png: '2.svg', name: 'Отримайте відповідь', description: "Ми оцінемо замовлення, ступінь його складності і об'єми робіт для погодження вартості виконання робіт" },
    { png: '3.svg', name: 'Приступаємо до роботи', description: 'Збираємо потрібну інформацію та виконуємо поставлену задачу згідно попереднім домовленостям ' },
    { png: '4.svg', name: 'Передаємо результати виконах робіт', description: 'Надсилаємо виконане завдання в форматі який показано на сайті.' },
    { png: '5.svg', name: 'Виконуємо коригування', description: 'Виконуємо роботу над помилками, коригуємо побажання сторони яка приймає роботи' },
  ];

  imgPath: string = 'process/';
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
    }, 4000); // Інтервал автопрокрутки
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
