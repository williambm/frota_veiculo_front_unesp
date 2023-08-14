import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Veiculo } from 'src/app/model/veiculo';
import { VeiculosService } from 'src/app/services/veiculos.service';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css'],
})
export class VeiculoListComponent {
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  veiculos: Veiculo[][] = [];
  displayedColumns: string[] = [
    'Id',
    'Placa',
    'Fabricante',
    'Modelo',
    'Qtd Passageiros',
    'Km',
    'Fabricação',
    'Caçamba',
    'acoes',
  ];
  pageIndex: number = 0; // Página atual
  pageSize: number = 5; // Tamanho da página
  totalElementos: number = 0; // Total de elementos da lista

  constructor(private veiculoService: VeiculosService) {}

  ngOnInit():void{
    this.carregarVeiculos()
  }

  carregarVeiculos(): void {
    this.veiculoService.findAllPaginado(0, 5).subscribe((resposta) => {
      this.veiculos = resposta.content;
      this.totalElementos = resposta.totalElements; // Atualiza o total de funcionários
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    //this.carregarFuncionariosPaginados(this.pageIndex,this.pageSize);
  }

  carregarVeiculosPaginados(pageIndex: number, pageSize: number) {
    this.veiculoService
      .findAllPaginado(this.pageIndex, this.pageSize)
      .subscribe((resposta) => {
        this.veiculos = resposta.content;
      });
  }
}
