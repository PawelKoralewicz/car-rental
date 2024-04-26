import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationDTO } from './registration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  createForm(): FormGroup<RegistrationDTO> {
    return this.fb.group<RegistrationDTO>({
      username: this.fb.nonNullable.control('', Validators.required),
      email: this.fb.nonNullable.control('', Validators.email),
      password: this.fb.nonNullable.control('', Validators.required)
    })
  }

  registerUser(userData: any) {
    return this.http.post('http://localhost:1337/api/auth/local/register', userData, { observe: 'response'});
  }
}
