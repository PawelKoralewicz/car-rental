import { FormControl } from "@angular/forms"

export type LoginDTO = {
    identifier: FormControl<string>,
    password: FormControl<string>,
}

export interface ILoginResponse {
    jwt: string;
}