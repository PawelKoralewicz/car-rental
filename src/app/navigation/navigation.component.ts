import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { CarsAddComponent } from '../auth/cars-add/cars-add.component';
import { AuthenticationGuard } from '../authentication.guard';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

  hasPermission: boolean = false;

  constructor(private dialog: DialogService, private service: NavigationService) { }

  isLogged() {
    if(sessionStorage.getItem('token') || localStorage.getItem('token')) {
      this.hasPermission = true;
    }
    return this.hasPermission;
  }


  addNewCar() {
    this.dialog.open(CarsAddComponent, { styleClass: 'my-dialog' });
  }

  logOut() {
    localStorage.getItem('token') ? localStorage.removeItem('token') : sessionStorage.removeItem('token');
    window.location.reload();
  }

  changeLanguage(event: any) {
    const lang = event.checked === false ? "PL" : "ENG"
    this.service.changeLang.next(lang);
    console.log(this.service.changeLang2.getValue());
    this.service.changeLang2.next(lang);
    console.log(event);
  }

  ngOnInit(): void {
      this.isLogged();
  }
}
