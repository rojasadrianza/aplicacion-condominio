import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(private http: HttpClient) { }

  saveParametro(parametros:any): Observable<any>{   
    const body = { nombre: parametros.nombre, valor: parametros.valor, nemonico: parametros.nemonico, fecha: parametros.fecha};
    const url = environment.uri+'/api/condominio/parametros';
    return this.http.post(url,body)

  }

  consultaParametros(): Observable<any>{   
    const url = environment.uri+'/api/condominio/parametros';
    return this.http.get(url)  
  }

  consultaParametro(id:any): Observable<any>{  
    const url = environment.uri+'/api/condominio/parametro/'+id;
    return this.http.get(url)  
  }

  actualizarParametro(parametros:any): Observable<any>{  
    const body = { id: parametros.id,nombreParametro: parametros.nombre, valorParametro: parametros.valor, nemonico: parametros.nemonico};
    const url = environment.uri+'/api/condominio/parametro';
    return this.http.put(url,body)  
  }

  eliminarParametro(id:any): Observable<any>{      
    const url = environment.uri+'/api/condominio/parametro/'+id;
    return this.http.delete(url)  
  }



}

