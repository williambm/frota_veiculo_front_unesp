import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Funcionario } from 'src/app/model/funcionario';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css'],
})
export class FuncionarioListComponent {
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  funcionarios: Funcionario[][] = [];
  displayedColumns: string[]=['matricula','nome','funcao','email','perfil','acoes']
  pageIndex: number = 0; // Página atual
  pageSize: number = 5; // Tamanho da página
  totalElementos: number = 0; // Total de elementos da lista

  constructor(private funcionarioService: FuncionariosService) {}

  ngOnInit():void{
    this.carregarFuncionarios()
  }

  //Faço uma primeira carga para descobrir o total de elementos
  carregarFuncionarios(): void {
    this.funcionarioService.findAllPaginado(0, 5).subscribe((resposta) => {
      this.funcionarios = resposta.content;
      this.totalElementos = resposta.totalElements; // Atualiza o total de funcionários
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarFuncionariosPaginados(this.pageIndex,this.pageSize);
  }

  carregarFuncionariosPaginados(pageIndex: number, pageSize: number) {
    this.funcionarioService.findAllPaginado(this.pageIndex, this.pageSize).subscribe((resposta) => {
      this.funcionarios = resposta.content;
    });
  }
}
