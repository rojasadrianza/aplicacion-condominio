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
                    
                  const cookie = this.cookieService.check('token')
                  if(!cookie){
                    //window.alert('Ohh, la sesion a expirado!, debe ingresar nuevamente al sistema');
                    this.router.navigate(['/']);
                  } else{
                    /*errorMessage = 'Error: Ha ocurrido un error en la Aplicacion, el sistema se cerrará'; 
                    window.alert(errorMessage);*/
                    this.router.navigateByUrl('/');
                  }                   
                    
                }else{                                

                  const cookie = this.cookieService.check('token')
                  if(!cookie){
                    //window.alert('Ohh, la sesion a expirado!, debe ingresar nuevamente al sistema');
                    this.router.navigate(['/']);
                  } else{
                    /*errorMessage = 'Error: Ha ocurrido un error en el Servidor, el sistema se cerrará'; 
                    window.alert(errorMessage);*/
                    this.router.navigateByUrl('/');
                  }  
                }
                
                return throwError(errorMessage);

            })

           )

    
  }
}
