import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FiltersService } from './filters.service';
import { AuthService, ICarData } from '../../auth/auth.service';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() filters = new EventEmitter();

  cars: ICarData[] = [];
  capacities: { capacity: number }[] = [];
  doorsNum: { doors: number }[] = [];
  driveTypes: { drive: string }[] = [];
  fuelTypes: { fuel: string }[] = [];
  models: { model: string }[] = [];
  years: { year: number }[] = [];
  prices: number[] = [];
  minValue!: number;
  maxValue!: number;

  filtersSelect = [
    { id: 'brands', opts: "cars", fc: 'form.controls.brand', opt: 'brand', lbl: 'Brands' },
    { id: 'models', opts: 'models', fc: 'form.controls.model', opt: 'model', lbl: 'Models' },
    { id: 'drive', opts: 'driveTypes', fc: 'form.controls.drive', opt: 'drive', lbl: 'Drive type' },
    { id: 'doors', opts: 'doorsNum', fc: 'form.controls.doors', opt: 'doors', lbl: 'Doors number' },
    { id: 'capacity', opts: 'capacities', fc: 'form.controls.capacity', opt: 'capacity', lbl: 'Capacity' },
    { id: 'fuel', opts: 'fuelTypes', fc: 'form.controls.fuel', opt: 'fuel', lbl: 'Fuel type' },
    { id: 'years', opts: 'years', fc: 'form.controls.year', opt: 'year', lbl: 'Production year' },
  ]

  form = this.service.createForm(0, 1000);

  constructor(private service: FiltersService, private authService: AuthService) { }

  getCarsData() {
    this.authService.getCars().subscribe(res => {
      res.data.map(obj => {
        const { brand, capacity, doors, drive, fuel, model, price, year } = obj.attributes;

        this.pushIfNotExists(this.capacities, capacity, { capacity });
        this.pushIfNotExists(this.doorsNum, doors, { doors });
        this.pushIfNotExists(this.driveTypes, drive, { drive });
        this.pushIfNotExists(this.fuelTypes, fuel, { fuel });
        this.pushIfNotExists(this.models, model, { model });
        this.pushIfNotExists(this.years, year, { year });

        this.cars.push({ brand: brand.data.attributes.name, capacity, doors, drive, fuel, id: obj.id, model, price, year });
        this.prices.push(price);
      })
      this.minValue = Math.min(...this.prices);
      this.maxValue = Math.max(...this.prices);
      this.form = this.service.createForm(this.minValue, this.maxValue);
    })
  }

  pushIfNotExists(array: any[], value: any, newObj: any): void {
    const exists = array.some(obj => {
      const entries = Object.entries(obj);
      return entries.some(([k, v]) => v === value);
    });
  
    if (!exists) {
      array.push(newObj);
    }
  }

  filterCars() {
    const formValue = this.form.value;
    const filters = Object.entries(formValue).filter(([key, value]) => Array.isArray(value) ? value.length > 0 : value !== null && value.toString().length > 0).reduce(
      (cur, [key, value]) => {  return Object.assign(cur, {[key]: value})}, {});
    this.filters.emit(filters);
  }

  ngOnInit() {
    this.getCarsData();
  }

}
