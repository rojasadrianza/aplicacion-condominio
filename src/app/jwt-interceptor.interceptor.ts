import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private cookieService: CookieService) {}

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token:string = this.cookieService.get('token');
    let req = request;
    if (token) {
      //Agregamos el token al header
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }


    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/err401');
        }

        return throwError( err );

      })
    );
  }
}
