import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConsultaCuentasService } from '@services/consulta-cuentas.service';

@Component({
  selector: 'app-consulta-pagos',
  templateUrl: './consulta-pagos.component.html',
  styleUrls: ['./consulta-pagos.component.css']
})
export class ConsultaPagosComponent {

  constructor(private http: HttpClient,private consultaCuentasService: ConsultaCuentasService) { }

  listadoDePagos: any[] = [];

  aprobar(id:any){
    this.actualizar(id,"APROBAR");
  }

  denegar(id:any){
    this.actualizar(id,"RECHAZAR");
  }

  ngOnInit(): void {
    this.consultaCuentas();
  }

  consultaCuentas(){
      
    this.consultaCuentasService.consultapagos().subscribe({
      next: (response) => {
        console.log(response)

      this.listadoDePagos = response.pagos;
      }, 
      error: () =>{
        console.log("Ha ocurrido un error en la consulta") 
      }
    })}


    actualizar(id:any,estatus:any){
      if(window.confirm('Esta seguro de '+ estatus + ' el pago?')){           
        if (estatus=='APROBAR'){
           estatus = 'APROBADO';
        }else{
          estatus = 'RECHAZADO';
        }
        const parametros = {
          id:id,
          estatus:estatus
        }            
        this.consultaCuentasService.actualizarParametro(parametros).subscribe({
          next: (response) => {            
            this.consultaCuentas();        
          }, 
          error: () =>{        
          }
         })  
      }  
    }  


}
