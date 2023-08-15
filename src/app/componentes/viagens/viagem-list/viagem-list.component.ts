import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Motorista } from 'src/app/model/motorista';
import { Viagem } from 'src/app/model/viagem';
import { ViagensService } from 'src/app/services/viagens.service';

@Component({
  selector: 'app-viagem-list',
  templateUrl: './viagem-list.component.html',
  styleUrls: ['./viagem-list.component.css'],
})
export class ViagemListComponent {
  viagens: Viagem[][] = [];

  motorista: Motorista = {
    motoristaId: 0,
    viagemId: 0,
  };

  //Ordem das colunas
  displayedColumns: string[] = [
    'solicitanteNome',
    'dataViagem',
    'statusViagem',
    'campusOrigem',
    'motoristaNome',
    'veiculoModelo',
    'cep',
    'logradouro',
    'numero',
    'bairro',
    'cidade',
    'estado',
    'acoes',
  ];

  //Controle de perfil de usuário
  perfilUsuario: string = '';

  pageIndex: number = 0; // Página atual
  pageSize: number = 5; // Tamanho da página
  totalElementos: number = 0; // Total de elementos da lista

  constructor(
    private viagensService: ViagensService,
    private toast: ToastrService,
    private route: Router,
    private routerPath: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarViagens();
    this.verificaPerfilUsuario();
  }

  carregarViagens(): void {
    this.viagensService.findAllPaginadoByPerfil(0, 5).subscribe((resposta) => {
      this.viagens = resposta.content;
      this.totalElementos = resposta.totalElements; // Atualiza o total de funcionários
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarViagensPaginados(this.pageIndex, this.pageSize);
  }

  carregarViagensPaginados(pageIndex: number, pageSize: number) {
    this.viagensService
      .findAllPaginadoByPerfil(this.pageIndex, this.pageSize)
      .subscribe((resposta) => {
        this.viagens = resposta.content;
      });
  }

  verificaPerfilUsuario() {
    this.perfilUsuario = `${sessionStorage.getItem('perfil')}`;
  }

  atribuirse(pathParam: number) {
    this.motorista.viagemId = pathParam;
    //Pega o Id do motorista da sessão storage dele
    this.motorista.motoristaId = sessionStorage.getItem('matricula');

    this.viagensService
      .atribuirMotorista(this.motorista.viagemId, this.motorista)
      .subscribe(
        (resposta) => {
          this.toast.info(`Viagem solicitada com sucesso`, 'SUCESSO');          
          this.route.navigate(['/viagens']);
          
        },
        (responseError) => {
          console.log(responseError);
        }
      );
  }
}
