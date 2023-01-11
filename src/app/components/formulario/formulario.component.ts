import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '@environment/environment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

 
  //variable creada para cerrar el modal padre que contiene este formulario
  @Output()
  close = new EventEmitter<String>();

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

  constructor(private loginService: LoginService, private cookieService: CookieService, public router: Router) { }
  
  correoIngresado='';
  passwordIngresado='';
  //@Output() parametros = new EventEmitter<any>();

  ngOnInit(): void {
    
  }

  
  loginUsuario(){
    const PARAMETROS = {      
      correo:this.correoIngresado,      
      password:this.passwordIngresado
    }
    this.close.emit("true"); //estoy pasando true pero no se usa en el padre ese valor, solo llama a la funcion de cerrar modal  
    this.send(PARAMETROS);    
  }

  send(parametros:any): any{    
    this.loginService.loginUsuario(parametros).subscribe({
      next: (response) => {
        //console.log('LOGIN-->'+response.tipo);
        const tipo = response.tipo;
        const dateNow = new Date();
        dateNow.setMinutes(dateNow.getMinutes() + Number(environment.cookieTine));
        this.cookieService.set('token', response.token,dateNow);  
        if (tipo == 2 ) {
           this.router.navigateByUrl('/user'); 
        }else if (tipo == 1) {
           this.router.navigateByUrl('/admin');        
        }            
              
      }, 
      error: () =>{
        console.log('Usuario invalido')   
      }
    })}







}
