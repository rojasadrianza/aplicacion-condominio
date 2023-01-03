import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /*constructor(private http: HttpClient) { }

  getNoticias(parametros:any): Observable<any>{

    const url = 'https://newsapi.org/v2/top-headlines?country='+parametros.pais+'&category='+parametros.categoria+'&apiKey=cdba51fde0214044af32cfc306522db7';
    return this.http.get(url);

  }*/

}
