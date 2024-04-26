import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CarsAddFormType, IBrandResponse, IGetBrands } from './cars-add';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsAddService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  createForm() {
    return this.fb.group<CarsAddFormType>({
      name: this.fb.nonNullable.control('', Validators.required),
      model: this.fb.nonNullable.control('', Validators.required),
      drive: this.fb.nonNullable.control('', Validators.required),
      fuel: this.fb.nonNullable.control('', Validators.required),
      capacity: this.fb.nonNullable.control(null, Validators.required),
      price: this.fb.nonNullable.control(null, Validators.required),
      doors: this.fb.nonNullable.control(null, Validators.required),
      year: this.fb.nonNullable.control(null, Validators.required),
      seats: this.fb.nonNullable.control(null, Validators.required),
      images: this.fb.nonNullable.control([])
    })
  }

  postBrand(name: string) {
    return this.http.post<IBrandResponse>('http://localhost:1337/api/brands', {data: { name: name}});
  }

  getBrand(brandName: string) {
    return this.http.get<IGetBrands>(`http://localhost:1337/api/brands?filters[name][$eqi]=${brandName}`);
  }

  postImages(images: any) {
    return this.http.post<any[]>('http://localhost:1337/api/upload', images);
  }

  postCar(data: any) {
    return this.http.post('http://localhost:1337/api/cars', data, { observe: 'response' });
  }
}
