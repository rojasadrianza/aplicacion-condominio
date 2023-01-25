import { formatDate, formatNumber } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagosService } from '@services/pagos.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {

  constructor(private pagosService: PagosService,private router: Router,@Inject(LOCALE_ID) public locale: string,private cookieService: CookieService) {}

  registerForm = new FormGroup({
    fecha: new FormControl('',[Validators.required]),
    monto: new FormControl('',[Validators.required]),
    //bancos: new FormControl('',[Validators.required]),
    referencia: new FormControl('',[Validators.required])
  
  },);
  get fechaControl(): FormControl{
    return this.registerForm.get('fecha') as FormControl;
  }
  get montoControl(): FormControl{
    return this.registerForm.get('monto') as FormControl;
  }
  /*get bancosControl(): FormControl{
    return this.registerForm.get('bancos') as FormControl;
  }*/
  get referenciaControl(): FormControl{
    return this.registerForm.get('referencia') as FormControl;
  } 

referenciaPago='';
bancoPago='';
montoPago='';
fechaPago='';
listadoDeBancos: any[] = [];
estado: any;
display=false;
monto:any;
fecha='';
//info: any[] = [];
dolar:any;
total:any;






mostrar(){
  if(this.display){
    this.display=false;
  }else{
    this.display=true;
  }
  
}

ngOnInit(): void {
  this.consultaParametros();
  this.consultaDatosTablaInfo();
  this.consultaDolar();
}

onChange(event:any){
  this.bancoPago = event.target.value;
}

  submitData(){
    const parametros = {
      fecha:this.fechaPago,
      monto:this.montoPago,
      banco:this.bancoPago,
      referencia:this.referenciaPago,
      idUsuario:this.cookieService.get('uId'),
      estatus: 'PENDIENTE'      
    }
     
      console.log('BANCO ' + this.bancoPago);
      this.pagosService.savePago(parametros).subscribe({
        next: (response) => {
          this.estado = true;
          //this.consultaParametros();          
        }, 
        error: () =>{
          
        }
       })

       this.registerForm.reset();
       this.estado = false;
    
  }


  consultaParametros(){
      
    this.pagosService.consultaBancos().subscribe({
      next: (response) => {
        //console.log(response)
        this.listadoDeBancos = response.bancos;        
      }, 
      error: () =>{        
      }
    })}


  consultaDatosTablaInfo(){
    const format = 'dd/MM/yyyy';

    //console.log('ID ' + this.cookieService.get('uId'));

    this.pagosService.consultaInfo(this.cookieService.get('uId')).subscribe({
      next: (response) => {
       this.monto = response.cuentas.monto;  
       this.fecha = formatDate(response.cuentas.fecha, 'dd/MM/yyyy' ,this.locale);            
      }, 
      error: () =>{        
      }

    })


  }


  consultaDolar(){
      
    this.pagosService.consultaDolar().subscribe({
      next: (response) => {        
        this.dolar = response.parametro.valorParametro; 
        //this.total = Number(this.monto) * Number(this.dolar);  

        //console.log('TOTAL ' + this.total);
      }, 
      error: () =>{        
      }
    })}
    

}
