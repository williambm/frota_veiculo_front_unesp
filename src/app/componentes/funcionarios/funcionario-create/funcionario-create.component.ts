import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/model/funcionario';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-funcionario-create',
  templateUrl: './funcionario-create.component.html',
  styleUrls: ['./funcionario-create.component.css'],
})
export class FuncionarioCreateComponent {

  constructor(
    private datePipe: DatePipe, //Pipe de datas do angular para ajustar datas
    private toast: ToastrService,
    private funcionarioService:FuncionariosService,
    private route: Router
  ){}

  funcionario: Funcionario = {
    matricula: '',
    nome: '',
    senha: '',
    email: '',
    dataAdmissao: '',
    dataNascimento: '',
    funcao: '',
    perfil: 'PASSAGEIRO',
  };

  matricula:FormControl = new FormControl(null,Validators.required);
  nome:FormControl = new FormControl(null,Validators.minLength(3));
  senha:FormControl = new FormControl(null,Validators.minLength(3));
  email:FormControl = new FormControl(null,Validators.email);
  dataAdmissao:FormControl = new FormControl(null,Validators.required);
  dataNascimento:FormControl = new FormControl(null,Validators.required);
  funcao:FormControl = new FormControl(null,Validators.minLength(4));
  perfil:FormControl = new FormControl('PASSAGEIRO',Validators.required);

  validaCampos(){
    return(
      this.matricula.valid &&
      this.nome.valid &&
      this.senha.valid &&
      this.email.valid &&
      this.dataAdmissao.valid
    )
  }

  criar(){
    const formattedDataAdmissao = this.datePipe.transform(this.funcionario.dataAdmissao, 'yyyy-MM-dd','-0300','pt');

    const formattedDataNascimento = this.datePipe.transform(this.funcionario.dataNascimento, 'yyyy-MM-dd');

    //Ajuste dos atributos de funcionário
    this.funcionario.dataAdmissao = `${formattedDataAdmissao}`;
    this.funcionario.dataNascimento = `${formattedDataNascimento}`;

    //Comunicação com o service da API
    this.funcionarioService.create(this.funcionario).subscribe(
      resposta=>{
        this.toast.info('Funcionário cadastrado com sucesso', 'SUCESSO'),
        this.route.navigate(['/funcionarios'])
      },
      responseError => {
        if (responseError.error.errors) {
          responseError.error.errors.forEach((element: { message: string | undefined; fieldName: string | undefined; }) => {
            this.toast.error(element.message, element.fieldName)
          });
        } else {
          this.toast.error(`${responseError.error.message}`, `${responseError.error.error}`)
        }
      }
    )

  }
}
