import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FirebaseDataService } from '../../config/firebaseData.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false,
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  selectedImage: File | null = null;
  imageUploadError: string | null = null;
  selectedImagePreview: string | null = null;
  autorization: boolean = false;

  constructor(
    private fb: FormBuilder,
    private firebaseDataService: FirebaseDataService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      surName: ['', Validators.required],
      phone: [null, Validators.required],
      photoURL: [''],
    });
  }

  async ngOnInit() {
    await this.checkAuthorization();
  }

  async checkAuthorization() {
    this.authService.getCurrentUser().subscribe((data) => {
      if (data) {
        // console.log('Користувач авторизований:', data);
        this.autorization = true;
        this.updateUser();
      } else {
        this.autorization = false;
      }
    });
  }

  // Використовуємо Promise для отримання даних
  updateUser() {
    this.userService.getUserProfile().then(data => {
      if (data) {
        this.profileForm.patchValue({
          firstName: data['firstName'] || '',
          lastName: data['lastName'] || '',
          surName: data['surName'] || '',
          phone: data['phone'] || null,
          photoURL: data['photoURL'] || '',  // Фото користувача, якщо є
        });
      } else {
        console.log('Користувач не авторизований');
      }
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
      // photoURL: this.profileForm.value.photoURL,  // Якщо є фото, додавати
      email: this.profileForm.value.phone,
      createdAt: new Date(),
    };

    console.log('userProfileData:', userProfileData);

    this.userService.saveUserProfile(userProfileData)
      .then(() => {
        console.log('Профіль успішно збережено!');
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
