import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  isLogged: boolean = false;

  constructor() { }

  checkToken() {
    if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
      this.isLogged = true;
    }
    return this.isLogged;
  }

  ngOnInit(): void {
      this.checkToken();
  }
}
