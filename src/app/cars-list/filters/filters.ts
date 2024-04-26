import { FormControl } from "@angular/forms"

export type filtersFormType = {
    brand: FormControl<string[] | null>,
    model: FormControl<string[] | null>,
    year: FormControl<number[] | null>,
    fuel: FormControl<string[] | null>,
    drive: FormControl<string[] | null>,
    doors: FormControl<number[] | null>,
    capacity: FormControl<number[] | null>,
    priceMin: FormControl<number>,
    priceMax: FormControl<number>;
}
