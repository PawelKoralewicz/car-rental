# CarsFront

## [EN]
This project was created using Angular 15 for the frontend layer and Strapi for the backend.
It is a web-based system for car rental listings.

The system offers the following features:
* Logging in and registration
* Adding listings
* Browsing available listings
* Filtering listings
* Booking cars  

<b>Important note:</b> The focus of this project was on functionality rather than UI quality. As a result, the user interface was designed with a touch of humor and may not provide the best user experience or aesthetic appeal (it’s somewhat rough around the edges).  

## [PL]
Ten projekt został stworzony przy użyciu Angular 15 do wykonania warstwy frontend oraz Strapi - backend.  
Jest to system webowy z ogłoszeniami samochodów na wynajem.  

 System umożlwia:
 * Logowanie i rejestrację
 * Dodawanie ogłoszeń
 * Przeglądanie dostępnych ogłoszeń
 * Filtrowanie ogłoszeń
 * Rezerwację samochodów  

<b>Ważna uwaga:</b> W tym projekcie priorytetem była funkcjonalność, a nie jakość interfejsu użytkownika. W związku z tym interfejs został zaprojektowany z odrobiną humoru i może nie oferować najlepszego doświadczenia użytkownika ani walorów estetycznych (jest nieco niedopracowany).  

## [EN] Adding data to database | [PL] Dodanie danych do bazy (Strapi)
cd car-rental
npm run strapi import -- -f my-strapi-export.tar.gz.enc
key: 123

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.  

## System presentation
### Home page  
![Image 1: Home page](https://github.com/user-attachments/assets/ee96e68c-8688-463e-98d4-7ae869b81894)  
*Image 1: Home page.*  

### Login and registration  
![Image 2: Registration page](https://github.com/user-attachments/assets/94b4790e-fa6f-4a13-9cc8-abac2bd5b825)  
*Image 2: Registration page.*  

![Image 3: Login page](https://github.com/user-attachments/assets/c3760ef7-ec37-4c70-8831-ca52a9e2240d)
*Image 3: Login page.*  

### Cars view  
![Image 4: Cars list view](https://github.com/user-attachments/assets/d64820ef-576b-4a8c-a1a1-58a155d5342b)  
*Image 4: Cars list view.*  

![Image 5: Car description view](https://github.com/user-attachments/assets/8b08666a-0520-4177-b514-aa8f777dc223)  
*Image 5: Car description view.*  

![Image 6: New car listing form](https://github.com/user-attachments/assets/9e13186e-48d8-4f87-8a59-3a719d35e459)  
*Image 6: New car listing form*  



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
