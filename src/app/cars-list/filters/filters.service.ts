import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filtersFormType } from './filters';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(private fb: FormBuilder) { }

  createForm(priceMin:number, priceMax: number): FormGroup<filtersFormType> {
    return this.fb.group<filtersFormType>({
      brand: this.fb.control(null),
      model: this.fb.control(null),
      year: this.fb.control(null),
      fuel: this.fb.control(null),
      drive: this.fb.control(null),
      doors: this.fb.control(null),
      capacity: this.fb.control(null),
      priceMin: this.fb.nonNullable.control(priceMin),
      priceMax: this.fb.nonNullable.control(priceMax),
    })
  }
}
