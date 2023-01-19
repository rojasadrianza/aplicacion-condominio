import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCuentasService {

  constructor(private http: HttpClient) { }


  consultaCuentas(): Observable<any>{
    
   
   
    const url = environment.uri+'/api/condominio/Cuentas';

    return this.http.get(url)  

  }
}
