import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IData } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ViewCarService {

  constructor(private http: HttpClient) { }

  getCar(carId: number) {
    return this.http.get<IData>(`http://localhost:1337/api/cars/${carId}?populate=*`);
  }

  postBooking(data: any) {
    return this.http.post('http://localhost:1337/api/rents', data, { observe: 'response' });
  }
}
