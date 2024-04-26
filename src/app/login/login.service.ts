import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginResponse, LoginDTO } from './login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  createForm(): FormGroup<LoginDTO> {
    return this.fb.group<LoginDTO>({
      identifier: this.fb.nonNullable.control('', Validators.email),
      password: this.fb.nonNullable.control('', Validators.required),
    })
  }

  login(userData: any) {
    return this.http.post<ILoginResponse>('http://localhost:1337/api/auth/local', userData, { observe: 'response' });
  }
}
