import { Component } from '@angular/core';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { environment } from '@environment/environment';
import { ConsultaCuentasService } from '@services/consulta-cuentas.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  /*percentDone!: number;
  uploadSuccess!: boolean;*/
  estado: any;

  file?: any;
  name?: any;
  listadoDeCuentas: any[] = [];

  constructor(
    private http: HttpClient,private consultaCuentasService: ConsultaCuentasService
    ) { }


  ngOnInit(): void {
    this.consultaCuentas();
  }

   getFile(event: any){        
     this.file = event.target.files[0];
     console.log(this.file);
   }
    submitData(){
      let formData = new FormData();
      formData.set("name", "file");
      formData.set("file", this.file);
      const url = environment.uri+'/api/datos';
      this.http.post(url,formData)
      .subscribe((response) => {
          this.estado = true;
          //console.log('CARGA correcta -->');
          this.leerFile();
      });
      
    }

    leerFile(){
      const url = environment.uri+'/api/condominio';
      this.http.post(url,'')
      /*.subscribe((response) => {           
          this.consultaCuentas();
      });*/
      .subscribe({
        next: (response) => {
          this.consultaCuentas();         
        }, 
        error: () =>{
          console.log("Ha ocurrido un error en la carga") 
        }
      })



    }


    consultaCuentas(){
      
      this.consultaCuentasService.consultaCuentas().subscribe({
        next: (response) => {
          console.log(response)

          this.listadoDeCuentas = response.cuentas;
        }, 
        error: () =>{
          console.log("Ha ocurrido un error en la consulta") 
        }
      })}


}
