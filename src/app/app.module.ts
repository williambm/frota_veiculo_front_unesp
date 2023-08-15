import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './componentes/auth/auth.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; //Para usar o formControle preciso desses dois módulos
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ToastrModule } from 'ngx-toastr';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { FuncionarioListComponent } from './componentes/funcionarios/funcionario-list/funcionario-list.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { FuncionarioCreateComponent } from './componentes/funcionarios/funcionario-create/funcionario-create.component';
import { DatePipe } from '@angular/common';
import { FuncionarioEditComponent } from './componentes/funcionarios/funcionario-edit/funcionario-edit.component';
import { FuncionarioDeleteComponent } from './componentes/funcionarios/funcionario-delete/funcionario-delete.component';
import { VeiculoListComponent } from './componentes/veiculos/veiculo-list/veiculo-list.component';
import { VeiculoCreateComponent } from './componentes/veiculos/veiculo-create/veiculo-create.component';
import { VeiculoEditComponent } from './componentes/veiculos/veiculo-edit/veiculo-edit.component';
import { VeiculoDeleteComponent } from './componentes/veiculos/veiculo-delete/veiculo-delete.component';
import { ViagemListComponent } from './componentes/viagens/viagem-list/viagem-list.component';
import { ViagemCreateComponent } from './componentes/viagens/viagem-create/viagem-create.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    MenuComponent,
    CabecalhoComponent,
    FuncionarioListComponent,
    FuncionarioCreateComponent,
    FuncionarioEditComponent,
    FuncionarioDeleteComponent,
    VeiculoListComponent,
    VeiculoCreateComponent,
    VeiculoEditComponent,
    VeiculoDeleteComponent,
    ViagemListComponent,
    ViagemCreateComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut:4000,
      closeButton:true,
      progressBar:true
    }),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    AuthInterceptorProvider,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
