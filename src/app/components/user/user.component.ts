import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '@services/usuario.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  resultado='';
  //@Input() usuarioInput:any;
  //usuario: any[] = [];
  constructor(private usuarioService: UsuarioService,private cookieService: CookieService, public router: Router) {}

    usuario: any[] = [];
    nombreUsuario='';


    buscarUsuarios(){
      
      this.usuarioService.buscarUsuario().subscribe({
        next: (response) => {
          console.log(response.usuarios)
          this.nombreUsuario = response.usuarios.nombre; 
          //this.usuario = response.usuarios;
          console.log('NOMBRE USUARIO ' + this.nombreUsuario) 
        }, 
        error: () =>{
          console.log("Usuario no Existe") 
        }
      })}

      logout(){
        this.cookieService.delete('token'); 
        this.nombreUsuario='';         
        this.router.navigateByUrl(''); 
      }

}
