import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  close:any;

  constructor(public modal:NgbModal) { }

  ngOnInit(): void {
    console.log( );
  }

  cerrar(valor:any) {
    this.modal.dismissAll('cancel');
  }

}
