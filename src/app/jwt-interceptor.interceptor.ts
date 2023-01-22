import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private cookieService: CookieService) {}

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token:string = this.cookieService.get('token');
    let req = request;
    if (token) {
      //Agregamos el token al header
      //console.log('PASO POR EL INTERCEPTOR-----------------------------------');      

    const headers = new HttpHeaders({
      'Authorization': token
    });
    request = request.clone({headers});
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          //this.router.navigateByUrl('/err401');
          //console.log('Ha ocurrido el siguiente error: ' + err.message);
          this.router.navigateByUrl('/');
        }

        return throwError( err );

      })
    );
  }
}
