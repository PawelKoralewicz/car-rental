import { FormControl } from "@angular/forms"

export type CarsAddFormType = {
    name: FormControl<string>,
    model: FormControl<string>,
    drive: FormControl<string>,
    fuel: FormControl<string>,
    capacity: FormControl<number | null>,
    price: FormControl<number | null>,
    doors: FormControl<number | null>,
    year: FormControl<number | null>,
    seats: FormControl<number | null>,
    images: FormControl<File[]>
}

export interface IBrandData {
    data: IBrandPostName;
}

interface IBrandPostName {
    name: string;
}

export interface IBrandResponse {
    data: IBrandResData;
}

export interface IGetBrands {
    data: IBrandResData[];
}

interface IBrandResData {
    id: number;
    attributes: any;
}