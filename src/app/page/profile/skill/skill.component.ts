import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FirebaseDataService } from '../../../config/firebaseData.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { StatusMessageService } from '../../../services/status-message.service';
import { services as servicesData } from '../../../data/data-our-services';
import { tools as toolsData } from '../../../data/data-tools';
import { animations } from '../../../interface/animation';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['../profile.component.scss'],
  standalone: false,
  animations: [
    animations.topOut,
    animations.appearance,
    animations.fadeIn,
  ],
})
export class SkillComponent implements OnInit {

  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  toolsForm: FormGroup;
  autorization: boolean = false;
  userData: any;
  tools = toolsData;
  photoURL: any;
  userGoogleData: any;
  showTools: boolean = false;
  toogleTools() {
    this.showTools = !this.showTools;
  }

  toggleToolsSelection(technology: any): void {
    this.savedTools.push({ ...technology });
    this.filterTools();
  }

  filteredTools: any[] = [];
  savedTools: any[] = [];

  filterTools(): void {
    this.filteredTools = this.tools.filter(
      (technology) =>
        !this.savedTools.some((saved) => saved.name === technology.name)
    );
  }

  saveTechnology(technology: any) {
    alert(`Інструмент "${technology.name}" збережено з рівнем володіння ${technology.proficiency}%`);
  }

  constructor(
    private fb: FormBuilder,
    private firebaseDataService: FirebaseDataService,
    private userService: UserService,
    private authService: AuthService,
    private statusMessageService: StatusMessageService,
  ) {
    this.toolsForm = this.fb.group({
      tools: [''],
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
        this.toolsForm.patchValue({
          tools: data['tools'] || '',
        });
        this.savedTools = data['tools'] || [];
      } else { }
      this.filterTools();
    }).catch(error => {
      console.error('Помилка при отриманні профілю:', error);
    });
  }

  saveTools() {
    const userToolsData = {
      tools: this.savedTools,
    };
    console.log('userServiseData:', userToolsData);
    this.userService.saveToolsProfile(userToolsData)
      .then(() => {
        console.log('Профіль успішно збережено!');
        this.statusMessageService.setStatusMessage('Профіль успішно збережено!');
      })
      .catch((error) => {
        console.error('Помилка збереження профілю:', error);
      });
  }

}

