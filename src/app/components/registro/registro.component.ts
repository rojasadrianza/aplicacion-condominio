import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators}  from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})






export class RegistroComponent implements OnInit {



registerForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$")] ),
  passwordConfirm: new FormControl('',Validators.required),
},passwordsMustBeEqual);
get emailControl(): FormControl{
  return this.registerForm.get('email') as FormControl;
}
get passwordControl(): FormControl{
  return this.registerForm.get('password') as FormControl;
}


constructor() {}

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

}

export const passwordsMustBeEqual: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password') as FormControl;
  const passwordConfirm = group.get('passwordConfirm') as FormControl;

  return password.value === passwordConfirm.value ? null : {passwordsMustBeEqual: true} 
};
