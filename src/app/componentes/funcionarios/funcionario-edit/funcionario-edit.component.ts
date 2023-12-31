import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/model/funcionario';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-funcionario-edit',
  templateUrl: './funcionario-edit.component.html',
  styleUrls: ['./funcionario-edit.component.css'],
})
export class FuncionarioEditComponent {
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
  
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  email: FormControl = new FormControl(null, Validators.email);
  dataAdmissao: FormControl = new FormControl(null, Validators.required);
  dataNascimento: FormControl = new FormControl(null, Validators.required);
  funcao: FormControl = new FormControl(null, Validators.minLength(4));
  perfil: FormControl = new FormControl('PASSAGEIRO', Validators.required);

  validaCampos() {
    return (      
      this.nome.valid &&
      this.senha.valid &&
      this.email.valid &&
      this.dataAdmissao.valid
    );
  }

  ngOnInit(): void {    
    this.funcionario.matricula = this.routerPath.snapshot.paramMap.get('matricula');    
    this.findById();
  }

  findById() {
    //Faz o get no backend e preenche o resto do objeto no angular
    this.funcionarioService
      .findById(this.funcionario.matricula)
      .subscribe((resposta) => {
        this.funcionario = resposta;
      });
  }

  atualizar() {
    this.funcionarioService.update(this.funcionario).subscribe(
      (resposta) => {
        this.toast.info(
          `O funcionarios ${resposta.nome} de matrícula: ${resposta.matricula}, foi atualizado com sucesso!`,
          'Atualização de Funcionário'
        ),
          this.route.navigate(['funcionarios']);
      },
      (responseError) => {
        if (responseError.error.errors) {
          responseError.error.errors.forEach(
            (element: {
              message: string | undefined;
              fieldName: string | undefined;
            }) => {
              this.toast.error(element.message, element.fieldName);
            }
          );
        } else {
          this.toast.error(
            `${responseError.error.message}`,
            `${responseError.error.error}`
          );
        }
      }
    );
  }
}
