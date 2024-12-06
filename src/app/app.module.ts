import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedService } from './services/shared.service';
import { NavComponent } from './components/nav/nav.component';
import { BasketComponent } from './components/basket/basket.component';
import { CarueselComponent } from './components/caruesel/caruesel.component';
import { FooterComponent } from './components/footer/footer.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { ToolsComponent } from './components/tools/tools.component';
import { CheckDeviceService } from './services/checkDevice.service';
import { ToogleService } from './services/toogle.service';
import { PricePipe } from './pipe/price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    CarueselComponent,
    ToolsComponent,
    OurServicesComponent,
    BasketComponent,
    PricePipe,
  ],

  bootstrap: [AppComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatSelectModule,
    MatDialogModule,
    MatSliderModule,
    MatIconModule,
    RouterModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    HammerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    NgOptimizedImage,
  ],
  providers: [
    DatePipe,
    SharedService,
    CheckDeviceService,
    ToogleService,
    PricePipe,
  ]
})

export class AppModule { }
