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

  consultapagos(): Observable<any>{   
    const url = environment.uri+'/api/condominio/pagosClientes';
    return this.http.get(url)  
  }

  actualizarParametro(params:any): Observable<any>{  
    const body = { id: params.id,estatus: params.estatus};
    const url = environment.uri+'/api/condominio/pago';
    return this.http.put(url,body)  
  }

}
