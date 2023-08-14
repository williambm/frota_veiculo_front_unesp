import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './componentes/auth/auth.component';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { AuthGuard } from './auth/guard.guard';
import { FuncionarioListComponent } from './componentes/funcionarios/funcionario-list/funcionario-list.component';
import { FuncionarioCreateComponent } from './componentes/funcionarios/funcionario-create/funcionario-create.component';
import { FuncionarioEditComponent } from './componentes/funcionarios/funcionario-edit/funcionario-edit.component';
import { FuncionarioDeleteComponent } from './componentes/funcionarios/funcionario-delete/funcionario-delete.component';
import { VeiculoListComponent } from './componentes/veiculos/veiculo-list/veiculo-list.component';
import { VeiculoCreateComponent } from './componentes/veiculos/veiculo-create/veiculo-create.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    component: MenuComponent,
    canActivate:[AuthGuard],
    children:[
      { path: 'home', component: HomeComponent },
      { path: 'funcionarios', component: FuncionarioListComponent },
      { path: 'funcionarios/create', component: FuncionarioCreateComponent },
      { path: 'funcionarios/edit/:matricula', component: FuncionarioEditComponent },
      { path: 'funcionarios/delete/:matricula', component: FuncionarioDeleteComponent },
      { path: 'veiculos', component: VeiculoListComponent },
      { path: 'veiculos/create', component: VeiculoCreateComponent }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
