import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators}  from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { ValidaUsuarioService } from 'src/app/services/valida-usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

existe?:Boolean;
existeApart?:Boolean;


registerForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$")] ),
  passwordConfirm: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$")]),
  nombreIngresado: new FormControl('', [Validators.required, Validators.minLength(5)]),
  pisoIngresado: new FormControl('', [Validators.required]),
  apartamentoIngresado: new FormControl('', [Validators.required])

},passwordsMustBeEqual);
get emailControl(): FormControl{
  return this.registerForm.get('email') as FormControl;
}
get passwordControl(): FormControl{
  return this.registerForm.get('password') as FormControl;
}
get passwordConfirmControl(): FormControl{
  return this.registerForm.get('passwordConfirm') as FormControl;
}
get nombreIngresadoControl(): FormControl{
  return this.registerForm.get('nombreIngresado') as FormControl;
}
get pisoIngresadoControl(): FormControl{
  return this.registerForm.get('pisoIngresado') as FormControl;
}
get apartamentoIngresadoControl(): FormControl{
  return this.registerForm.get('apartamentoIngresado') as FormControl;
}


constructor(private validaUsuarioService: ValidaUsuarioService) {}

nombreIngresado='';
correoIngresado='';
pisoIngresado=0;
apartamentoIngresado=0;
estatusIngresado='';
tipoIngresado='';
passwordIngresado='';
passwordIngresadoConfirmacion='';
@Output() parametros = new EventEmitter<any>();

  ngOnInit(): void {
  }

  enviarUsuario(){    
         
        const PARAMETROS = {
            nombre:this.nombreIngresado,
            correo:this.correoIngresado,
            piso:this.pisoIngresado,
            apartamento:this.apartamentoIngresado,
            estatus:0,
            tipo:2,
            password:this.passwordIngresado
        }

        this.parametros.emit(PARAMETROS);

        this.registerForm.reset;
      
  }


  buscarEmail(){
    var email = this.correoIngresado;
    this.validaUsuarioService.validaUsuario(email).subscribe({
      next: (response) => {
        console.log('Cuenta de correo ya existe')
        this.existe=true;
        
      }, 
      error: () =>{
        console.log('Cuenta de correo no existe')        
        this.existe=false;
        //this.enviarUsuario();
        this.buscarApartamento();

      }
    })}

    buscarApartamento(){
      
      const PARAMETROS = {
        piso: this.pisoIngresado,
        apartamento: this.apartamentoIngresado
     }

      this.validaUsuarioService.validaApartamento(PARAMETROS).subscribe({
        next: (response) => {
          console.log('Apartamento ya registrado')
          this.existeApart=true;          
        }, 
        error: () =>{
          console.log('Apartamento no registrado')        
          this.existeApart=false;
          this.enviarUsuario();
        }
    })}




}

export const passwordsMustBeEqual: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password') as FormControl;
  const passwordConfirm = group.get('passwordConfirm') as FormControl;

  return password.value === passwordConfirm.value ? null : {passwordsMustBeEqual: true} 
};

/*export function checkUsername(validaUsuarioService: ValidaUsuarioService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    //console.log('isAvailable ' + validaUsuarioService.validaUsuario(control.value).pipe(map((isAvailable) =>isAvailable ? null : {checkUsername:true})));
      //console.log("VALOR CONTROL-------------------->" + control.value);
    return validaUsuarioService
       .validaUsuario(control.value)
       .pipe(
          map((isAvailable) =>
             isAvailable ? null : {checkUsername:true} 
          )
        );  
  };
}*/
