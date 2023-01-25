import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
//import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { HomeComponent } from './components/home/home.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { ParametrosComponent } from './components/parametros/parametros.component';
import { UploadComponent } from './components/upload/upload.component';
//import { ModalRegistroComponent } from './components/modal-registro/modal-registro.component';
import { UserComponent } from './components/user/user.component';
import { ValidaUsuarioComponent } from './components/valida-usuario/valida-usuario.component';
import { UserGuardGuard } from './user-guard.guard';



const routes: Routes = [  
  { path: '', component: HomeComponent },
  { path: 'login', component: FormularioComponent },
  { path: 'valida/:id', component: ValidaUsuarioComponent },
  { path: 'user', component: UserComponent, canActivate: [ UserGuardGuard ],canActivateChild: [ UserGuardGuard ],
  
  children: [
    {
      path: 'pagos', // child route path
      component: PagosComponent // child route component that the router renders
    },
    /*{
      path: 'parametros',
      component: ParametrosComponent // another child route component that the router renders
    },
    {
      path: 'parametrosEditar/:id',
      component: ParametrosComponent // another child route component that the router renders
    },*/

  ],
  },


  { path: 'admin', component: AdminComponent, canActivate: [ UserGuardGuard ],canActivateChild: [ UserGuardGuard ],

  children: [
    {
      path: 'carga', // child route path
      component: UploadComponent // child route component that the router renders
    },
    {
      path: 'parametros',
      component: ParametrosComponent // another child route component that the router renders
    },
    /*{
      path: 'parametrosEditar/:id',
      component: ParametrosComponent // another child route component that the router renders
    },*/

  ],}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }