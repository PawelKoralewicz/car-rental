import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError, empty } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const jwtToken = localStorage?.getItem('token') || sessionStorage?.getItem('token');
      let newRequest = request;
      if(jwtToken) {
        newRequest = request.clone({
          setHeaders: { Authorization: `Bearer ${jwtToken}` }
        })
      }
    return next.handle(newRequest).pipe(
      catchError((res: HttpErrorResponse) => {console.log(res); 
        if(res.status === 401) {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          this.router.navigateByUrl('/');
        }
        return EMPTY})
    );
  }
}
