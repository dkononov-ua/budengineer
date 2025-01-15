import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AllServicesComponent } from './components/all-services/all-services.component';
import { AboutServiseComponent } from './components/about-servise/about-servise.component';
import { HostServisesComponent } from './page/host-servises/host-servises.component';
import { AppComponent } from './app.component';
import { SpecialistsComponent } from './components/specialists/specialists.component';
import { ProfileComponent } from './page/profile/profile.component';
import { PersonComponent } from './page/profile/person/person.component';
import { SkillComponent } from './page/profile/skill/skill.component';
import { ServiseComponent } from './page/profile/servise/servise.component';
import { FeaturesComponent } from './page/profile/features/features.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Головна' } },
  {
    path: 'services',
    component: HostServisesComponent,
    data: { breadcrumb: 'Послуги' },
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllServicesComponent, data: { breadcrumb: 'Всі' } },
      { path: ':name', component: AboutServiseComponent, data: { breadcrumb: ':name' } },
    ],
  },
  { path: 'specialists', component: SpecialistsComponent, data: { breadcrumb: 'Спеціалісти' } },
  {
    path: 'profile', component: ProfileComponent, data: { breadcrumb: 'Профіль' },
    children: [
      { path: '', redirectTo: 'person', pathMatch: 'full' },
      { path: 'person', component: PersonComponent, data: { breadcrumb: 'Персональна інформація' } },
      { path: 'skill', component: SkillComponent, data: { breadcrumb: 'Навички' } },
      { path: 'service', component: ServiseComponent, data: { breadcrumb: 'Послуги' } },
      { path: 'features', component: FeaturesComponent, data: { breadcrumb: 'Особливості' } },
    ],
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
