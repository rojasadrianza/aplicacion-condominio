import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private cookieService: CookieService) {}

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
           .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) =>{
                let errorMessage = '';
                if (error.error instanceof ErrorEvent){
                    //Client side erroe
                    //errorMessage = 'Error:' + error.error.message; 
                    errorMessage = 'Error: Ha ocurrido un error en la Aplicacion, vuelva a intentarlo ó consulte al administrador'; 
                    console.log('Error Front' + error.error.message);
                }else{
                    //errorMessage = 'Error Code:' + error.status + ' ' + error.message;
                    errorMessage = 'Error: Ha ocurrido un error en el Servidor,vuelva a intentarlo ó consulte al administrador'; 
                    console.log('Error Back' +  error.status + ' ' + error.message);
                }
                window.alert(errorMessage);
                return throwError(errorMessage);

            })

           )

    
  }
}
