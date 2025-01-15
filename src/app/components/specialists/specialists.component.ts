import { Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss'],
  standalone: false, // компонент є standalone

})
export class SpecialistsComponent implements OnInit {

  teamMembers = [
    {
      "name": "Denys Kononov",
      "position": "Інженер-будівельник (ВТВ)",
      "description": "Денис має глибокі знання та практичні навички у сфері виконавчої документації. Він спеціалізується на складанні, перевірці та узгодженні документації, необхідної для успішного виконання будівельних проектів. Його досвід охоплює оформлення актів виконаних робіт, технічних звітів, а також ведення обліку та контролю за виконанням будівельних норм і стандартів. Denys активно працює з проектними і будівельними групами для забезпечення відповідності всіх документів вимогам нормативно-правових актів та стандартів галузі.",
      "image": "/specialists/3.jpg",
      "social": {
        "telegram": "https://t.me/DenisKononov",
        "instagram": "https://www.instagram.com/kononov.den1s/",
        "twitter": "https://www.twitter.com",
        "linkedin": "https://www.linkedin.com/in/denys-kononov-371625261/"
      }
    },

    {
      name: 'Ilya Zhuchenko',
      position: 'Інженер-будівельник (ВТН)',
      description: 'Ілля кваліфікований інженер-будівельник з багаторічним досвідом роботи у сфері будівництва. Він спеціалізується на проектуванні, управлінні будівельними процесами та забезпеченні високих стандартів якості виконання робіт. Denys має глибоке розуміння технічних аспектів будівництва, від проектування до реалізації, та завжди дотримується найкращих практик для досягнення оптимальних результатів. Його уважність до деталей і здатність знаходити ефективні рішення роблять його важливим спеціалістом у сфері будівництва.',
      image: '/specialists/2.jpg',
      social: {
        telegram: '',
        twitter: '',
        linkedin: ''
      }
    },
    {
      name: 'Vitaly Seliverstov',
      position: 'Інженер-будівельник (ВТВ)',
      "description": "Віталій досвідчений інженер-будівельник, який займається управлінням будівельними проектами, контролем за виконанням робіт та спілкуванням з замовниками. Він працює в ролі начальника дільниці, відповідаючи за координацію робочих процесів на будівельних майданчиках. Віталій має великий досвід у управлінні будівельними проектами, орієнтується на якість і строки виконання робіт, а також на забезпечення безпеки та ефективності процесів. Він комунікабельний і має чудові навички управління командою, що дозволяє успішно виконувати навіть найскладніші завдання.", image: '/specialists/1.jpg',
      social: {
        telegram: '',
        twitter: '',
        linkedin: ''
      }
    },
  ]

  scrollToAnchor(anchor: number): void {
    setTimeout(() => {
      const element = this.el.nativeElement.querySelector(`#conteiner${anchor}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  }
  users: any[] = []; // Масив для зберігання користувачів

  constructor(
    private el: ElementRef,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.scrollToAnchor(0);
    this.loadAllUsers();
  }

  async loadAllUsers() {
    try {
      this.users = await this.userService.getAllUsers(); // Отримуємо список користувачів
      // console.log('Користувачі:', this.users);
    } catch (error) {
      console.error('Помилка при отриманні користувачів:', error);
    }
  }
}



