import { Component, EventEmitter, Output,Inject,LOCALE_ID } from '@angular/core';
import { ParametrosService } from '@services/parametros.service';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators}  from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent {

  

constructor(private parametrosService: ParametrosService,private router: Router,@Inject(LOCALE_ID) public locale: string) {}

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
fechaParametroMostrar=false;
idParametro='';
estado: any;
listadoDeParametros: any[] = [];
parametros: any[] = [];

ngOnInit(): void {
  this.consultaParametros();
}
 
  

  editar(id:any){
    
    this.parametrosService.consultaParametro(id).subscribe({
      next: (response) => {
        this.fechaParametroMostrar=false;
        this.nombreParametro = response.parametro.nombreParametro;
        this.valorParametro = response.parametro.valorParametro;
        this.nemonicoParametro = response.parametro.nemonico;
        this.fechaParametro = formatDate(response.parametro.fecha, 'dd/MM/yyyy' ,this.locale);         
        this.idParametro = response.parametro._id;
        
      }, 
      error: () =>{        
      }
    })
  }

  actualizar(id:any){

    if(window.confirm('Esta seguro de actualizar el registro?')){
    
      const parametros = {
        nombre:this.nombreParametro,
        valor:this.valorParametro,
        nemonico:this.nemonicoParametro,
        id:id
      }
  
      //console.log('NOMBRE ' + this.nombreParametro);
      this.parametrosService.actualizarParametro(parametros).subscribe({
        next: (response) => {            
          this.idParametro='';  
          //this.fechaParametroMostrar=true;
          this.registerForm.reset();   
          this.consultaParametros();        
        }, 
        error: () =>{        
        }
       })

    }

  }  

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }


  eliminar(id:any){
    
    if(window.confirm('Esta seguro que desea eliminar el registro?')){
      this.parametrosService.eliminarParametro(id).subscribe({
        next: (response) => {
          this.consultaParametros();        
        }, 
        error: () =>{        
        }
      })
    } 
  }

  submitData(){
    const parametros = {
      nombre:this.nombreParametro,
      valor:this.valorParametro,
      nemonico:this.nemonicoParametro,
      fecha:this.fechaParametro
    }
     
      //console.log('NOMBRE ' + this.nombreParametro);
      this.parametrosService.saveParametro(parametros).subscribe({
        next: (response) => {
          this.estado = true;
          this.consultaParametros();          
        }, 
        error: () =>{
          
        }
       })

       this.registerForm.reset();
       this.estado = false;
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
