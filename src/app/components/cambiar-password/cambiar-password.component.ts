import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroService } from '@services/registro.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {

  constructor(private rutaActiva: ActivatedRoute,private registroService: RegistroService,public router: Router,) { }


  passwordIngresado='';
  passwordIngresadoConfirmacion='';
  actualizado:any;

  registerForm = new FormGroup({
    
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$")] ),
    passwordConfirm: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$")])
    
  
  },passwordsMustBeEqual);
  get passwordControl(): FormControl{
    return this.registerForm.get('password') as FormControl;
  }
  get passwordConfirmControl(): FormControl{
    return this.registerForm.get('passwordConfirm') as FormControl;
  }

  ngOnInit(): void {
    this.actualizado='';     
  }


  actualizarPassword(){
    const params = {
      password: this.passwordIngresado,
      id: this.rutaActiva.snapshot.params['id']
    } 

    this.registroService.updatePasswordUsuario(params).subscribe({
      next: (response) => {
        //.log('Estatus Actualizado')
        this.actualizado = true;
      }, 
      error: () =>{
        console.log('Estatus No Actualizado') 
      }
    })
  }

  volver(){
    this.router.navigateByUrl('/');
  }


}

export const passwordsMustBeEqual: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password') as FormControl;
  const passwordConfirm = group.get('passwordConfirm') as FormControl;

  return password.value === passwordConfirm.value ? null : {passwordsMustBeEqual: true} 
};
