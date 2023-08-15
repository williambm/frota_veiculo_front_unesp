import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Viagem } from 'src/app/model/viagem';
import { ViagensService } from 'src/app/services/viagens.service';

@Component({
  selector: 'app-viagem-list',
  templateUrl: './viagem-list.component.html',
  styleUrls: ['./viagem-list.component.css']
})
export class ViagemListComponent {

  viagens: Viagem[][]=[];
  displayedColumns: string[] = [
    //'id',
    //'solicitanteId',
    'solicitanteNome',
    //'motoristaId',
    'motoristaNome',
    //'veiculoId',
    'cep',
    'logradouro',
    'numero',
    //'complemento',
    'bairro',
    'cidade',
    'estado',
    'campusOrigem',
    'dataViagem'
  ];
  
  pageIndex: number = 0; // Página atual
  pageSize: number = 5; // Tamanho da página
  totalElementos: number = 0; // Total de elementos da lista

  constructor(private viagensService:ViagensService){}

  ngOnInit():void{
    this.carregarViagens()
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
    this.carregarViagensPaginados(this.pageIndex,this.pageSize);
  }

  carregarViagensPaginados(pageIndex: number, pageSize: number) {
    this.viagensService
      .findAllPaginadoByPerfil(this.pageIndex, this.pageSize)
      .subscribe((resposta) => {
        this.viagens = resposta.content;
      });
  }

}
