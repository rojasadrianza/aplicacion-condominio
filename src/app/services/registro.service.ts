import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }

  saveUsuario(parametros:any): Observable<any>{
    
    const body = { nombre: parametros.nombre, correo: parametros.correo, piso: parametros.piso, apartamento: parametros.apartamento, estatus: parametros.estatus, tipo: parametros.tipo, password:parametros.password};
    const url = environment.uri+'/api/usuario';

    return this.http.post(url,body)  

  }

  updateStatusUsuario(parametros:any): Observable<any>{
    
    
      const body = {estatus: parametros.estatus};
      const url = environment.uri+'/api/usuarioValida/'+parametros.id;
      return this.http.put(url,body)
    
    
     

  }



  


}
