import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(private http: HttpClient) { }


  consultaBancos(): Observable<any>{   
    const url = environment.uri+'/api/pagos/bancos';
    return this.http.get(url)  
  }


  savePago(parametros:any): Observable<any>{   
    const body = { fecha: parametros.fecha, monto: parametros.monto, banco: parametros.banco, referencia: parametros.referencia,idUsuario: parametros.idUsuario,estatus: parametros.estatus};
    const url = environment.uri+'/api/pagos/registro';
    return this.http.post(url,body)

  }


  consultaInfo(id:any): Observable<any>{   
    const url = environment.uri+'/api/pagos/info/'+id;
    return this.http.get(url)  
  }

  consultaDolar(): Observable<any>{   
    const url = environment.uri+'/api/pagos/dolar';
    return this.http.get(url)  
  }


}
