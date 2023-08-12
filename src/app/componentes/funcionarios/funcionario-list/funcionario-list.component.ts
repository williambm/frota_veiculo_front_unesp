import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css'],
})
export class FuncionarioListComponent {
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  funcionarios: any[] = [];

  constructor(private funcionarioService: FuncionariosService) {}

  ngOnInit():void{
    this.carregarFuncionarios()
  }

  carregarFuncionarios(): void {
    this.funcionarioService.findAllPaginado(0, 5).subscribe((resposta) => {
      this.funcionarios = resposta.content;

      console.log(this.funcionarios)
    });
  }
}
