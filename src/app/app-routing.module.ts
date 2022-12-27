import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ModalRegistroComponent } from './components/modal-registro/modal-registro.component';



const routes: Routes = [  
  //{ path: '', redirectTo: 'registro', pathMatch: 'full' },
  { path: 'login', component: FormularioComponent }
  //{ path: 'registro', component: ModalRegistroComponent }
  //{ path: 'registro/:id', component: ModalRegistroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }