import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface Car {
  brand: IBrandData;
  capacity: number;
  doors: number;
  drive: string;
  fuel: string;
  id: number;
  images: IImagesData;
  model: string;
  price: number;
  year: number;
}

export interface ICarData {
  brand: string;
  capacity: number;
  doors: number;
  drive: string;
  fuel: string;
  id?: number;
  images?: string;
  model: string;
  price: number;
  year: number;
}

interface IImagesData {
  data: IImagesAttr[];
}

interface IImagesAttr {
  attributes: IImagesUrl;
}

interface IImagesUrl {
  url: any;
}

interface IBrandData {
  data: IBrandAttr;
}

interface IBrandAttr {
  attributes: IBrand;
}

interface IBrand {
  id: any;
  name: any;
}

export interface IDataArray {
  data: IResponse[];
}

export interface IData {
  data: IResponse;
}

export interface IResponse {
  id: number;
  attributes: Car;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getCars(filters?: any) {
    if (filters) {
      return this.http.get<IDataArray>(`http://localhost:1337/api/cars`, {responseType: 'json', params: {populate: '*', ...filters}});
    }
    return this.http.get<IDataArray>(`http://localhost:1337/api/cars?populate=*`, {responseType: 'json'});
  }

  getImages(id: number) {
    return this.http.get<IData>(`http://localhost:1337/api/cars/${id}?populate=*`, {responseType: 'json'});
  }
}
