import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
//import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
//import { ModalRegistroComponent } from './components/modal-registro/modal-registro.component';
import { UserComponent } from './components/user/user.component';
import { ValidaUsuarioComponent } from './components/valida-usuario/valida-usuario.component';
import { UserGuardGuard } from './user-guard.guard';



const routes: Routes = [  
  //{ path: 'home', pathMatch: 'full' },
  { path: 'login', component: FormularioComponent },
  { path: 'valida/:id', component: ValidaUsuarioComponent },
  { path: 'user', component: UserComponent, canActivate: [ UserGuardGuard ] },
  { path: 'admin', component: AdminComponent, canActivate: [ UserGuardGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }