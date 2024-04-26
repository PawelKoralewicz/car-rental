import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  changeLang = new Subject<string>();
  changeLang2 = new BehaviorSubject<string>("PL");

  constructor() { }

  switchLanguage() {
    
  }
}
