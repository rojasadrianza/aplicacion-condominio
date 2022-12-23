import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ModalRegistroComponent } from './components/modal-registro/modal-registro.component';



const routes: Routes = [
  { path: 'login', component: FormularioComponent },
  { path: 'registro', component: ModalRegistroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }