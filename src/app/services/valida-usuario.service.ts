import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidaUsuarioService {

  constructor(private http: HttpClient) { }

  validaUsuario(parametros:any): Observable<any>{  
    const url = environment.uri+'/api/usuarioValida/';
    return this.http.get(url+parametros)
  }

  validaApartamento(parametros:any): Observable<any>{  
    const url = environment.uri+'/api/apartamentoValida/'+parametros.apartamento+'&'+parametros.piso;
    return this.http.get(url)
  }

}
