import { Component, EventEmitter, Output } from '@angular/core';
import { ParametrosService } from '@services/parametros.service';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators}  from '@angular/forms';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent {

constructor(private parametrosService: ParametrosService) {}

registerForm = new FormGroup({
  nombre: new FormControl('',[Validators.required]),
  valor: new FormControl('',[Validators.required]),
  nemonico: new FormControl('',[Validators.required]),
  fecha: new FormControl('',[Validators.required])

},);
get nombreControl(): FormControl{
  return this.registerForm.get('nombre') as FormControl;
}
get vlorControl(): FormControl{
  return this.registerForm.get('valor') as FormControl;
}
get nemonicoControl(): FormControl{
  return this.registerForm.get('nemonico') as FormControl;
}
get fechaControl(): FormControl{
  return this.registerForm.get('fecha') as FormControl;
} 

nombreParametro='';
valorParametro='';
nemonicoParametro='';
fechaParametro='';
estado: any;
listadoDeParametros: any[] = [];

ngOnInit(): void {
  this.consultaParametros();
}


  submitData(){
    const parametros = {
      nombre:this.nombreParametro,
      valor:this.valorParametro,
      nemonico:this.nemonicoParametro,
      fecha:this.fechaParametro
    }
     
      console.log('NOMBRE ' + this.nombreParametro);
      this.parametrosService.saveParametro(parametros).subscribe({
        next: (response) => {
          this.estado = true;
          this.consultaParametros();
          //console.log('Parametro guardado')
        }, 
        error: () =>{
          //console.log('Parametro no guardado') 
        }
       })

       this.registerForm.reset();
   }

   consultaParametros(){
      
    this.parametrosService.consultaParametros().subscribe({
      next: (response) => {
        console.log(response)
        this.listadoDeParametros = response.parametros;
      }, 
      error: () =>{        
      }
    })}

}
