import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-valida-usuario',
  templateUrl: './valida-usuario.component.html',
  styleUrls: ['./valida-usuario.component.css']
})
export class ValidaUsuarioComponent implements OnInit {
  @ViewChild('content', {static: false}) contenidoDelModal: any;
  constructor(public modalValida:NgbModal, private rutaActiva: ActivatedRoute, private registroService: RegistroService, public router: Router) { }

  cerrar(){  
    this.modalValida.dismissAll('cancel');           
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {
    //console.log("ID " + this.rutaActiva.snapshot.params['id']);

    const params = {
      estatus: 1,
      id: this.rutaActiva.snapshot.params['id']
    } 


    this.registroService.updateStatusUsuario(params).subscribe({
      next: (response) => {
        console.log('Estatus Actualizado')
      }, 
      error: () =>{
        console.log('Estatus No Actualizado') 
      }
    })


    

  }

  ngAfterViewInit() {
    //this.modalValida.open(this.contenidoDelModal, { size: 'lg', centered: true });
    this.modalValida.open(this.contenidoDelModal, { centered: true });
  }

 
  
}
