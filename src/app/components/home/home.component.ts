import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { RegistroService } from '@services/registro.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  close:any;
  resultado='';

  constructor(public modal:NgbModal, private _api: RegistroService,public router: Router) { }  

  @ViewChild('contenido', { static: true })
  contenido!: TemplateRef<any>;

  @ViewChild('registrar', { static: true })
  registrar!: TemplateRef<any>;

  
  ngOnInit() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
    };
    this.modal.open(this.contenido, ngbModalOptions);
  }

  registroUsuario(parametro:any){
    console.log(parametro); 
    this._api.saveUsuario(parametro).subscribe(result=>
    {
     this.resultado =  result.usuarioGuardado._id;
    })      
  }

  cerrar(valor:any) {
    if(valor=="true"){
      this.modal.dismissAll('cancel');
    }
      
  }

  limpiar(){
    this.resultado ='';    
    this.modal.dismissAll('cancel');

    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
    };
    this.modal.open(this.contenido, ngbModalOptions);
  }

  openModal(){
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
    };
    this.modal.dismissAll('cancel');
    this.modal.open(this.registrar,ngbModalOptions);
  }


}
