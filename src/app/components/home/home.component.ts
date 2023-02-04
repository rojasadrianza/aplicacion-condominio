import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  recuperar='';
  cambiarPass='';

  constructor(public modal:NgbModal, private _api: RegistroService,public router: Router,private rutaActiva: ActivatedRoute) { }  

  @ViewChild('contenido', { static: true })
  contenido!: TemplateRef<any>;

  @ViewChild('recuperarPassword', { static: true })
  recuperarPassword!: TemplateRef<any>;

  @ViewChild('registrar', { static: true })
  registrar!: TemplateRef<any>;

  @ViewChild('cambiarPassword', { static: true })
  cambiarPassword!: TemplateRef<any>;

  
  ngOnInit() {
    
    if(this.rutaActiva.snapshot.params['recuperar']){
      this.recuperar = this.rutaActiva.snapshot.params['recuperar'] 
    }else{
      this.recuperar = '';
    }
    
    if(this.rutaActiva.snapshot.params['cambiar']){
      this.cambiarPass = this.rutaActiva.snapshot.params['cambiar'] 
    }else{
      this.cambiarPass = '';
    }  
    
    this.limpiar();
   
  }

  registroUsuario(parametro:any){    
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

  recuperarPasswordUsuario(){
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
    };
    this.modal.dismissAll('cancel');
    this.modal.open(this.recuperarPassword,ngbModalOptions);
  }


}
