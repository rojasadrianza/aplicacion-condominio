import { Component,  OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.css']
})
export class ModalRegistroComponent implements OnInit {

  constructor(public modalRegistro:NgbModal) { }

  ngOnInit(): void {
  }

}
