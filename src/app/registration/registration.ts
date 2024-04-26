import { EmailValidator, FormControl } from "@angular/forms"

export type RegistrationDTO = {
    username: FormControl<string>,
    email: FormControl<string>,
    password: FormControl<string>
}