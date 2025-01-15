import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FirebaseDataService } from '../../../config/firebaseData.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { StatusMessageService } from '../../../services/status-message.service';
import { services as servicesData } from '../../../data/data-our-services';
import { animations } from '../../../interface/animation';

@Component({
  selector: 'app-servise',
  templateUrl: './servise.component.html',
  styleUrls: ['../profile.component.scss'],
  standalone: false,
  animations: [
    animations.topOut,
    animations.appearance,
    animations.fadeIn,
  ],
})
export class ServiseComponent implements OnInit {

  serviseForm: FormGroup;
  autorization: boolean = false;
  categories = servicesData;
  savedServices: any[] = [];
  userGoogleData: any;
  filteredCategories: any[] = [];

  showItem: boolean = false;
  toogleShow() {
    this.showItem = !this.showItem;
  }

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
    this.filterServices();
  }

  filterServices(): void {
    this.filteredCategories = this.categories.map((category) => {
      const filteredServices = category.services.filter(
        (service) => !this.savedServices.some((saved) => saved.name === service.name)
      );
      return { ...category, services: filteredServices };
    });
  }

  constructor(
    private fb: FormBuilder,
    private firebaseDataService: FirebaseDataService,
    private userService: UserService,
    private authService: AuthService,
    private statusMessageService: StatusMessageService,
  ) {
    this.serviseForm = this.fb.group({
      services: [''],
    });
  }

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
    this.userService.getUserProfile().then(data => {
      if (data) {
        this.serviseForm.patchValue({
          social: data['social'] || '',
        });
        this.savedServices = data['services'] || [];
      } else { }
      this.filterServices();
    }).catch(error => {
      console.error('Помилка при отриманні профілю:', error);
    });
  }

  saveServise() {
    const userServiseData = {
      services: this.savedServices,
    };
    // console.log('userServiseData:', userServiseData);
    this.userService.saveServiseProfile(userServiseData)
      .then(() => {
        console.log('Послуги успішно збережено!');
        this.statusMessageService.setStatusMessage('Послуги успішно збережено!');
      })
      .catch((error) => {
        console.error('Помилка збереження профілю:', error);
      });
  }

}
