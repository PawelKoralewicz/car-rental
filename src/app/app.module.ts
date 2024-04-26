import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { FiltersComponent } from './cars-list/filters/filters.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { AuthComponent } from './auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CarsAddComponent } from './auth/cars-add/cars-add.component';
import { FileUploadModule } from 'primeng/fileupload';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './login/login.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ViewCarComponent } from './cars-list/view-car/view-car.component';
import { JwtInterceptor } from './jwt.interceptor';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CarsListComponent,
    FiltersComponent,
    HomeComponent,
    NavigationComponent,
    AuthComponent,
    CarsAddComponent,
    RegistrationComponent,
    LoginComponent,
    ViewCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToggleButtonModule,
    MultiSelectModule,
    ButtonModule,
    ReactiveFormsModule,
    SliderModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    PaginatorModule,
    DynamicDialogModule,
    CheckboxModule,
    PasswordModule,
    CarouselModule,
    TabViewModule,
    TableModule,
    CalendarModule,
    ConfirmDialogModule,
    RadioButtonModule,
    ToastModule,
    ImageModule,
    FileUploadModule
  ],
  providers: [DialogService, 
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
