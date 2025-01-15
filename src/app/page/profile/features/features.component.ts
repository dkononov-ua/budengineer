import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FirebaseDataService } from '../../../config/firebaseData.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { StatusMessageService } from '../../../services/status-message.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['../profile.component.scss'],
  standalone: false,

})
export class FeaturesComponent implements OnInit {

  levels = [
    { value: 0, label: 'Вільний' },
    { value: 1, label: 'Завантажений' },
    { value: 2, label: 'Помірно завантажений' },
    { value: 3, label: 'Сильно завантажений' },
    { value: 4, label: 'Перезавантажений' }
  ];

  // Поточний вибраний рівень завантаженості
  employmentLevel: number = 0; // Ініціалізація початковим значенням

  // Текстове значення для відображення
  employmentLevelText: string = 'Вільний'; // Початковий текст

  // Обробник зміни рівня
  onLevelChange(event: any) {
    const selectedLevel = this.levels.find(level => level.value === event.value);
    if (selectedLevel) {
      this.employmentLevelText = selectedLevel.label;
    }
  }

  autorization: boolean = false;
  userData: any;
  photoURL: any;
  userGoogleData: any;

  daysOfWeek: string[] = [
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    'Пʼятниця',
    'Субота',
    'Неділя',
  ];
  selectedDays: boolean[] = new Array(this.daysOfWeek.length).fill(false); // Масив для вибору днів
  startTimes: string[] = new Array(this.daysOfWeek.length).fill(''); // Масив для вибору часу "від"
  endTimes: string[] = new Array(this.daysOfWeek.length).fill(''); // Масив для вибору часу "до"

  hours: string[] = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')); // Час у 24-годинному форматі

  onDayChange(dayIndex: number) {
    if (!this.selectedDays[dayIndex]) {
      this.startTimes[dayIndex] = ''; // Очистити час "від", якщо день не вибраний
      this.endTimes[dayIndex] = ''; // Очистити час "до", якщо день не вибраний
    }
  }

  onEndTimeChange(dayIndex: number) {
    if (this.endTimes[dayIndex] <= this.startTimes[dayIndex]) {
      // Якщо час "до" менший або рівний часу "від", скидаємо значення "до"
      this.endTimes[dayIndex] = '';
    }
  }

  filteredEndTimes(dayIndex: number): string[] {
    // Фільтруємо час "до", щоб він був більший за "від"
    const startTime = Number(this.startTimes[dayIndex]);
    return this.hours.filter(hour => Number(hour) > startTime);
  }

  saveAvailability() {
    const availability = {
      selectedDays: this.selectedDays,
      startTimes: this.startTimes,
      endTimes: this.endTimes,
    };
    // console.log('Обраний розклад:', availability);
    // Логіка для збереження розкладу
  }

  formValid() {
    return this.selectedDays.some((day, index) => day && this.startTimes[index] !== '' && this.endTimes[index] !== '');
  }

  constructor(
    private firebaseDataService: FirebaseDataService,
    private userService: UserService,
    private authService: AuthService,
    private statusMessageService: StatusMessageService,
  ) { }

  async ngOnInit() {
    await this.checkAuthorization();
  }

  async checkAuthorization() {
    this.authService.getCurrentUser().subscribe((data) => {
      if (data) {
        this.autorization = true;
        this.getUserData();
      } else {
        this.autorization = false;
      }
    });
  }

  async getUserData() {
    this.firebaseDataService.userData$.subscribe((data: any) => {
      this.userGoogleData = data;
      this.getUser(this.userGoogleData);
    });
  }

  getUser(userGoogleData: any) {
    this.userService.getUserProfile()
      .then(data => {
        // console.log(data);
        if (data) {
          this.employmentLevel = data['features'].employmentLevel || 0;
          const availability = data['availability'];
          if (availability) {
            this.selectedDays = availability.selectedDays || new Array(this.daysOfWeek.length).fill(false);
            this.startTimes = availability.startTimes || new Array(this.daysOfWeek.length).fill('');
            this.endTimes = availability.endTimes || new Array(this.daysOfWeek.length).fill('');
          }
        }
      })
      .catch(error => {
        console.error('Помилка при отриманні профілю:', error);
      });
  }


  saveFeatures() {
    const userProfileData = {
      features: {
        employmentLevel: this.employmentLevel,
      },
      availability: {
        selectedDays: this.selectedDays,
        startTimes: this.startTimes,
        endTimes: this.endTimes,
      },
    };
    this.userService.saveFeaturesProfile(userProfileData)
      .then(() => {
        console.log('Профіль успішно збережено!');
        this.statusMessageService.setStatusMessage('Профіль успішно збережено!');
      })
      .catch((error) => {
        console.error('Помилка збереження профілю:', error);
      });
  }


}
