import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/model/funcionario';

@Component({
  selector: 'app-funcionario-create',
  templateUrl: './funcionario-create.component.html',
  styleUrls: ['./funcionario-create.component.css'],
})
export class FuncionarioCreateComponent {

  constructor(
    private datePipe: DatePipe //Pipe de datas do angular para ajustar datas
  ){}

  funcionario: Funcionario = {
    matricula: 0,
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
    const formattedDataAdmissao = this.datePipe.transform(this.funcionario.dataAdmissao, 'dd/MM/yyyy');
    const formattedDataNascimento = this.datePipe.transform(this.funcionario.dataNascimento, 'dd/MM/yyyy');

    console.log(this.funcionario)
    console.log(this.funcionario.dataAdmissao)
    console.log(formattedDataAdmissao)
    console.log(formattedDataNascimento)
  }
}
