import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FirebaseDataService } from '../../../config/firebaseData.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { StatusMessageService } from '../../../services/status-message.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['../profile.component.scss'],
  standalone: false,
})
export class PersonComponent implements OnInit {

  profileForm: FormGroup;
  autorization: boolean = false;
  userData: any;
  photoURL: any;
  userGoogleData: any;

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
      user: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        surName: ['', Validators.required],
        photoURL: [''],
      }),

      contacts: this.fb.group({
        phone: [null, Validators.required],
        email: [''],
      }),

      social: this.fb.group({
        telegram: ['', this.urlValidator()],
        instagram: ['', this.urlValidator()],
        linkedin: ['', this.urlValidator()]
      }),
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
        this.profileForm.patchValue({
          user: {
            firstName: data['user']?.['firstName'] || '',
            lastName: data['user']?.['lastName'] || '',
            surName: data['user']?.['surName'] || '',
            photoURL: data['user']?.['photoURL'] || '',
          },
          contacts: {
            phone: data['contacts']?.['phone'] || '',
            email: data['contacts']?.['email'] || '',
          },
          social: {
            telegram: data['social']?.['telegram'] || '',
            instagram: data['social']?.['instagram'] || '',
            linkedin: data['social']?.['linkedin'] || '',
          },
        });
      } else {
        this.profileForm.patchValue({
          user: {
            firstName: userGoogleData.firstName || '',
            lastName: userGoogleData.lastName || '',
            surName: '',
            photoURL: userGoogleData.photoURL || '',
          },
          contacts: {
            phone: userGoogleData.phone || '',
            email: userGoogleData.email || '',
          },
          social: {
            telegram: '',
            instagram: '',
            linkedin: '',
          },
        });
      }
    }).catch(error => {
      console.error('Помилка при отриманні профілю:', error);
    });
  }

  saveProfile() {
    console.log('this.profileForm:', this.profileForm);
    const userProfileData = {
      statistics: {
        lastSave: new Date(),
      },
      user: {
        firstName: this.profileForm.value.user.firstName,
        lastName: this.profileForm.value.user.lastName,
        surName: this.profileForm.value.user.surName,
        photoURL: this.profileForm.value.user.photoURL,
      },
      contacts: {
        phone: this.profileForm.value.contacts.phone,
        email: this.profileForm.value.contacts.email,
      },
      social: {
        telegram: this.profileForm.value.social.telegram,
        instagram: this.profileForm.value.social.instagram,
        linkedin: this.profileForm.value.social.linkedin,
      }
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

}
