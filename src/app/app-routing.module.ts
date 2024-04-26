import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ViewCarComponent } from './cars-list/view-car/view-car.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cars-list', component: CarsListComponent, canActivate: [AuthenticationGuard]},
  { path: 'about', component: AboutComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'view-car/:id', component: ViewCarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
