import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  buscarUsuario(): Observable<any>{        
    const url = environment.uri+'/api/usuario';
    return this.http.get(url)  
  }
}
