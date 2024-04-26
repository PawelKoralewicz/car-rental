import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form = this.service.createForm();
  remember: boolean = false;
  loading: boolean = false;

  constructor(private service: LoginService, private router: Router) { }

  loginSubmit() {
    const { ...userData } = this.form.value;
    this.loading = true;
    this.service.login({...userData}).subscribe((res) => {
       if(res.status === 200 && res.body?.jwt) {
        this.remember === true ? localStorage.setItem('token', res.body.jwt) : sessionStorage.setItem('token', res.body.jwt);
        this.loading = false;
        this.router.navigate(['/']);

      }
      return console.log(res);
    })
  }

  ngOnInit(): void {
  }
}
