import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  

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

      //console.log(PARAMETROS);
  }

}
