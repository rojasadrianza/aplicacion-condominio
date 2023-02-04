import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '@services/usuario.service';
import { ValidaUsuarioService } from '@services/valida-usuario.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {

  correoIngresado='';
  existeCorreo?:any;
 

  constructor(private validaUsuarioService: ValidaUsuarioService,public router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.existeCorreo='';     
  }


  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
       
  
  });
  get emailControl(): FormControl{
    return this.registerForm.get('email') as FormControl;
  }

  buscarEmail(){
    var email = this.correoIngresado;
    this.validaUsuarioService.validaUsuario(email).subscribe({
      next: (response) => {        
        
        
        this.recuperarPassword(email); 
        this.existeCorreo=true;
            
      }, 
      error: () =>{               
        this.existeCorreo=false;
        
      }
    })     
  }


  recuperarPassword(email:any){
    
    this.usuarioService.recuperarPassword(email).subscribe({
      next: (response) => {        
        //this.existeCorreo=true;             
      }, 
      error: () =>{               
        console.log("ERROR CORREO");       
      }
    })    


  }





  return(){
    this.router.navigateByUrl('/'); 
  }
  
}
