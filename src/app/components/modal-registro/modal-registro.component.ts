import { Component,  OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { RegistroService } from '@services/registro.service';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.css']
})
export class ModalRegistroComponent implements OnInit {

  constructor(public modalRegistro:NgbModal, private _api: RegistroService) { }

  ngOnInit(): void {
  }

  //Injeccion Servicio Registro
  //constructor(private _api: RegistroService){}
  registroUsuario(parametro:any){
    console.log(parametro); 
    this._api.saveUsuario(parametro).subscribe(result=>
    {console.log(result) })  
  }
  

}
