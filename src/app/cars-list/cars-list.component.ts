import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, Car, ICarData, IResponse } from '../auth/auth.service';
import { Subject, catchError, map, of, takeUntil } from 'rxjs';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit, OnDestroy {

  imagesUrls: { url: string }[] = [];

  carsList: ICarData[] = [];

  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private navigationService: NavigationService) { }

  getCars(filters?: any) {
    if(filters) {
      this.authService.getCars(filters).subscribe(res => {
        res.data.map(obj => {
          const { brand, capacity, doors, drive, fuel, model, price, year, images } = obj.attributes;
          this.carsList.push({ brand: brand.data.attributes.name, capacity, doors, drive, fuel, id: obj.id, model, price, year, images: `http://localhost:1337${images.data[0].attributes.url}` });
        })
      })
    } else {
        this.authService.getCars().subscribe(res => {
          res.data.map(obj => {
            const { brand, capacity, doors, drive, fuel, model, price, year, images } = obj.attributes;
            this.carsList.push({ brand: brand.data.attributes.name, capacity, doors, drive, fuel, id: obj.id, model, price, year, images: `http://localhost:1337${images.data[0].attributes.url}` });
          })
        })
    }
}
  
  viewCar() { }
  
  getFilters(filters: any) {
    let filtersObj = {};
    Object.entries(filters).forEach(([key, value]) => {
      if(key === 'brand') {
        const brand = 'filters[' + key + '][name][$in]';
        filtersObj = Object.assign(filtersObj, { [brand]: value });
      } else if (key === 'priceMax') {
        const priceMax = `filters[price][$lte]`;
        filtersObj = Object.assign(filtersObj, { [priceMax]: value });
      } else if (key === 'priceMin') {
        const priceMin = `filters[price][$gte]`;
        filtersObj = Object.assign(filtersObj, { [priceMin]: value });
      } else {
        const filter = `filters[${key}][$eqi]`;
        filtersObj = Object.assign(filtersObj, { [filter]: value })
      }
  })
    console.log(filtersObj);
    this.carsList = [];
    this.getCars(filtersObj);
  }

  ngOnInit(): void {
    this.getCars();
    this.navigationService.changeLang.subscribe(lang => {
      this.getCars();
      console.log(lang);
    })
    this.navigationService.changeLang2.pipe(
      takeUntil(this.destroy$)
    ).subscribe(lang => console.log(lang)).unsubscribe();
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
