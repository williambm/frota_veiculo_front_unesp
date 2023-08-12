import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './componentes/auth/auth.component';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { AuthGuard } from './auth/guard.guard';
import { FuncionarioListComponent } from './componentes/funcionarios/funcionario-list/funcionario-list.component';
import { FuncionarioCreateComponent } from './componentes/funcionarios/funcionario-create/funcionario-create.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  //{ path: '', component: MenuComponent },
  //{ path: 'home', component: HomeComponent },
  //{ path: 'home', component: HomeComponent }
  {
    path: '',
    component: MenuComponent,
    canActivate:[AuthGuard],
    children:[
      { path: 'home', component: HomeComponent },
      { path: 'funcionarios', component: FuncionarioListComponent },
      { path: 'funcionarios/create', component: FuncionarioCreateComponent }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
