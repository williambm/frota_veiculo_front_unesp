import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  //Teste do select field
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  email: FormControl = new FormControl(null, Validators.email);
  dataAdmissao: FormControl = new FormControl(null, Validators.required);
  dataNascimento: FormControl = new FormControl(null, Validators.required);
  funcao: FormControl = new FormControl(null, Validators.minLength(4));
  perfil: FormControl = new FormControl('PASSAGEIRO', Validators.required);

  constructor(
    private toast: ToastrService,
    private route: Router,
    private routerPath: ActivatedRoute,
    private funcionarioService: FuncionariosService
  ) {}

  ngOnInit(): void {
    //Captura o id através da rota - OBS a string do get() deve ser a mesma informada na rota que no nosso caso é:id
    this.funcionario.matricula =
      this.routerPath.snapshot.paramMap.get('matricula');      

    //Preenche o objeto de tenico chamando pelo ID no BackEnd
    this.findById();
    
  }  

  findById() {
    //Faz o get no backend e preenche o resto do objeto no angular
    this.funcionarioService
      .findById(this.funcionario.matricula)
      .subscribe((resposta) => {
        this.funcionario = resposta;
      },
      ex=>console.log(ex)
      );
  }

  excluir(){
    this.funcionarioService.delete(this.funcionario).subscribe(resposta=>{
      this.toast.info(`O funcionário foi excluído com sucesso`, 'Exclusão com Sucesso')
      this.route.navigate(['/funcionarios'])
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
    )
  }
}
