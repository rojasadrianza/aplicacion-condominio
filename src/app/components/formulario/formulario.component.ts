import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@services/login.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  token='';
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$")] )   
  
  });
  get emailControl(): FormControl{
    return this.registerForm.get('email') as FormControl;
  }
  get passwordControl(): FormControl{
    return this.registerForm.get('password') as FormControl;
  }

  constructor(private loginService: LoginService, private cookieService: CookieService) { }
  
  correoIngresado='';
  passwordIngresado='';
  //@Output() parametros = new EventEmitter<any>();

  ngOnInit(): void {
  }

  /*loginUsuario(){

    const PARAMETROS = {      
      correo:this.correoIngresado,      
      password:this.passwordIngresado
    }
      
    this.loginService.loginUsuario(PARAMETROS).subscribe(result=>
    {
      this.token =  result.token; 
      console.log('token ' + this.token);
    })
    
  }*/


  loginUsuario(){
    const PARAMETROS = {      
      correo:this.correoIngresado,      
      password:this.passwordIngresado
    }
    //this.parametros.emit(PARAMETROS);
    //console.log('PARAMETROS ' + this.parametros);
    this.send(PARAMETROS);
  }

  send(parametros:any): any{    
    this.loginService.loginUsuario(parametros).subscribe({
      next: (response) => {
        this.cookieService.set('token', response.token);
        console.log('COOKIE ' + this.cookieService.getAll );       
      }, 
      error: () =>{
        console.log('Usuario invalido')   
      }
    })}







}
