import { Component } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  form = this.service.createForm();

  constructor(private service: RegistrationService, private router: Router) { }

  submitRegistration() {
    const { ...user } = this.form.value;
    this.service.registerUser({...user}).subscribe(res => {
      if(res.status == 200) {
        this.router.navigate(['login']);
      }
    });
  }

}
