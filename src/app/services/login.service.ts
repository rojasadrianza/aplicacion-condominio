import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUsuario(parametros:any): Observable<any>{
    
    const body = { username: parametros.correo, password: parametros.password};
    //console.log('PASSWORD----------------------->'+parametros.password);
    const url = environment.uri+'/api/usuarioAuth';

    return this.http.post(url,body)  

  }

}
