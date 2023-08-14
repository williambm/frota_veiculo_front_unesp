import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/model/funcionario';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-funcionario-delete',
  templateUrl: './funcionario-delete.component.html',
  styleUrls: ['./funcionario-delete.component.css']
})
export class FuncionarioDeleteComponent {

  funcionario: Funcionario = {
    matricula: '',
    nome: '',
    senha: '',
    email: '',
    dataAdmissao: '',
    dataNascimento: '',
    funcao: '',
    perfil: '',
  };

  constructor(
    private toast: ToastrService,
    private route: Router,
    private routerPath: ActivatedRoute,
    private funcionarioService: FuncionariosService
  ) {}

  excluir(){
    
  }
}
