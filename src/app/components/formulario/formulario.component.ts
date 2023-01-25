import { Component, ErrorHandler,Injectable, Injector, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '@environment/environment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ValidaUsuarioService } from '@services/valida-usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '@services/error-service.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit,ErrorHandler {

  
 
  //variable creada para cerrar el modal padre que contiene este formulario
  @Output()
  close = new EventEmitter<String>();
  existeCorreo?:Boolean;
  existeUsuario?:Boolean;
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

  constructor(private loginService: LoginService, private cookieService: CookieService, public router: Router,private validaUsuarioService: ValidaUsuarioService,private injector: Injector) { }
  

  //Terminar esta rutina para el manejo de errores
  //Ver: https://michael-karen.medium.com/esperando-lo-inesperado-buenas-pr%C3%A1cticas-para-el-manejo-de-errores-en-angular-dc578da68ef9
  handleError(error: Error | HttpErrorResponse){
    const errorService = this.injector.get(ErrorService);  
    let message;
    let stackTrace;  

    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = errorService.getServerMessage(error);
      stackTrace = errorService.getServerStack(error);
      //notifier.showError(message);
  /*} else {
      // Client Error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      notifier.showError(message);*/
    }
  }

  correoIngresado='';
  passwordIngresado='';
  //@Output() parametros = new EventEmitter<any>();

  ngOnInit(): void {
    
  }

  buscarEmail(){
    var email = this.correoIngresado;
    this.validaUsuarioService.validaUsuario(email).subscribe({
      next: (response) => {
        //console.log('Cuenta de correo ya existe')
        this.existeCorreo=true; 
        this.loginUsuario();       
      }, 
      error: () =>{
        //console.log('Cuenta de correo no existe')        
        this.existeCorreo=false;
      }
    })}

  
  loginUsuario(){
    const PARAMETROS = {      
      correo:this.correoIngresado,      
      password:this.passwordIngresado
    }
    //this.close.emit("true"); //estoy pasando true pero no se usa en el padre ese valor, solo llama a la funcion de cerrar modal  
    this.send(PARAMETROS);    
  }

  send(parametros:any): any{    
    this.loginService.loginUsuario(parametros).subscribe({
      next: (response) => {        
        const tipo = response.tipo;
        const uId = response.user;
        const dateNow = new Date();
        dateNow.setMinutes(dateNow.getMinutes() + Number(environment.cookieTine));
        this.cookieService.set('token', response.token,dateNow);
        this.cookieService.set('uId', uId,dateNow);   
        this.close.emit("true"); 
        this.existeUsuario=false;
        if (tipo == 2 ) {
           this.router.navigateByUrl('/user'); 
        }else if (tipo == 1) {
           this.router.navigateByUrl('/admin');        
        }     
      }, 
      error: () =>{         
        this.close.emit("false");  
        this.existeUsuario=false;
      }




    })}







}
