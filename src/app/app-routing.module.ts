import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AllServicesComponent } from './components/all-services/all-services.component';
import { AboutServiseComponent } from './components/about-servise/about-servise.component';
import { HostServisesComponent } from './page/host-servises/host-servises.component';
import { AppComponent } from './app.component';
import { SpecialistsComponent } from './components/specialists/specialists.component';

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
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
