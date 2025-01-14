import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FirebaseDataService } from '../../config/firebaseData.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { StatusMessageService } from '../../services/status-message.service';
import { services as servicesData } from '../../data/data-our-services'; // Імпорт даних
import { tools as toolsData } from '../../data/data-tools'; // Імпорт даних

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false,
})
export class UserProfileComponent implements OnInit {

  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;


  profileForm: FormGroup;
  selectedImage: File | null = null;
  imageUploadError: string | null = null;
  selectedImagePreview: string | null = null;
  autorization: boolean = false;
  userData: any;
  categories = servicesData; // Список категорій із даних
  tools = toolsData; // Список категорій із даних
  selectedCategory: any = null; // Вибрана категорія
  filteredServices: any[] = []; // Список послуг із вибраної категорії
  dataToSave: any;


  savedServices: any[] = []; // Масив збережених послуг

  private serviceSelectionCache: Record<string, boolean> = {};
  photoURL: any;
  updateServiceSelectionCache() {
    this.serviceSelectionCache = {};
    this.savedServices.forEach((service) => {
      this.serviceSelectionCache[service.name] = true;
    });
  }

  selectedServiceNames = new Set<string>();

  // Оновлюємо збережені послуги та фільтруємо категорії
  toggleServiceSelection(category: any, service: any, price: number): void {
    const index = this.savedServices.findIndex(
      (savedService) => savedService.name === service.name
    );
    if (index === -1) {
      this.savedServices.push({
        id: service.id,
        category: category.category,
        name: service.name,
        price: service.price,
        url: service.url,
      });
    } else {
      this.savedServices.splice(index, 1);
    }
    this.filterServices();  // Фільтруємо послуги після зміни списку
  }

  toggleToolsSelection(technology: any): void {
    // Додаємо вибрану технологію до savedTools
    this.savedTools.push({ ...technology });
    // Перезапускаємо фільтрацію
    this.filterTools();
  }


  filteredTools: any[] = []; // Відфільтровані технології
  savedTools: any[] = []; // Список збережених технологій

  // Функція фільтрації технологій
  filterTools(): void {
    this.filteredTools = this.tools.filter(
      (technology) =>
        !this.savedTools.some((saved) => saved.name === technology.name)
    );
    console.log('filteredTools:', this.filteredTools);
  }


  filteredCategories: any[] = [];
  // Функція фільтрації послуг
  filterServices(): void {
    this.filteredCategories = this.categories.map((category) => {
      // Фільтруємо послуги кожної категорії, видаляючи збережені
      const filteredServices = category.services.filter(
        (service) => !this.savedServices.some((saved) => saved.name === service.name)
      );

      // console.log('filteredCategories:', this.categories);
      return { ...category, services: filteredServices }; // Повертаємо новий масив з відфільтрованими послугами
    });
  }

  urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
      if (control.value && !urlPattern.test(control.value)) {
        return { invalidUrl: true };
      }
      return null;
    };
  }

  constructor(
    private fb: FormBuilder,
    private firebaseDataService: FirebaseDataService,
    private userService: UserService,
    private authService: AuthService,
    private statusMessageService: StatusMessageService,
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      surName: ['', Validators.required],
      phone: [null, Validators.required],
      photoURL: [''],
      services: [''],
      social: this.fb.group({
        telegram: ['', this.urlValidator()],
        instagram: ['', this.urlValidator()],
        linkedin: ['', this.urlValidator()]
      }),
      tools: [''],
    });

  }

  async ngOnInit() {
    await this.checkAuthorization();
    console.log(this.filteredTools);

    this.updateServiceSelectionCache(); // Оновлення кешу після завантаження збережених послуг
  }


  async checkAuthorization() {
    this.authService.getCurrentUser().subscribe((data) => {
      if (data) {
        // console.log('Користувач авторизований:', data);
        this.autorization = true;
        this.getUserData();
      } else {
        this.autorization = false;
      }
    });
  }

  async getUserData() {
    this.firebaseDataService.userData$.subscribe((data: any) => {
      this.userData = data;
      this.updateUser(this.userData);
    });
  }

  // Використовуємо Promise для отримання даних
  updateUser(userData: any) {
    // console.log('userData:', userData.photoURL);
    this.profileForm.patchValue({
      firstName: userData.displayName || '',
      phone: userData.phoneNumber || '',
    });
    this.photoURL = userData.photoURL || '',  // Фото користувача, якщо є

      this.getUser();
  }

  // Використовуємо Promise для отримання даних
  getUser() {
    this.userService.getUserProfile().then(data => {
      if (data) {
        // console.log('Профіль користувача:', data);
        this.profileForm.patchValue({
          firstName: data['firstName'] || '',
          lastName: data['lastName'] || '',
          surName: data['surName'] || '',
          phone: data['phone'] || '',
          photoURL: this.photoURL || '',  // Фото користувача, якщо є
          services: data['services'] || '',
          social: data['social'] || '',
          tools: data['tools'] || '',
        });
        console.log('Профіль користувача:', this.profileForm);

        this.savedServices = data['services'] || [];
      } else {
        console.log('Користувач не авторизований');
      }
      this.filterServices(); // Фільтруємо послуги після завантаження
      this.filterTools();
    }).catch(error => {
      console.error('Помилка при отриманні профілю:', error);
    });
  }

  // Збереження профілю
  saveProfile() {
    const userProfileData = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      surName: this.profileForm.value.surName,
      phone: this.profileForm.value.phone,
      email: this.userData.email,
      createdAt: new Date(),
      services: this.savedServices,
      tools: this.savedTools,
      social: this.profileForm.value.social,
      photoURL: this.profileForm.value.photoURL,
    };
    console.log('userProfileData:', userProfileData);
    this.userService.saveUserProfile(userProfileData)
      .then(() => {
        console.log('Профіль успішно збережено!');
        this.statusMessageService.setStatusMessage('Профіль успішно збережено!');
      })
      .catch((error) => {
        console.error('Помилка збереження профілю:', error);
      });
  }




  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedImage = file;
  //     this.selectedImagePreview = URL.createObjectURL(file); // Прев'ю зображення
  //     console.log('selectedImage:', this.selectedImage);
  //     console.log('selectedImagePreview:', this.selectedImagePreview);
  //     this.saveImage(this.selectedImage);
  //   }
  // }

  // saveImage(file: any) {
  //   if (file) {
  //     this.firebaseDataService.saveImage(file); // Викликаємо метод для збереження зображення
  //   }
  // }

}
