import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ViagensEstatistica } from 'src/app/model/viagensEstatistica';
import { RelatoriosService } from 'src/app/services/relatorios.service';

@Component({
  selector: 'app-viagens-estatisticas',
  templateUrl: './viagens-estatisticas.component.html',
  styleUrls: ['./viagens-estatisticas.component.css'],
})
export class ViagensEstatisticasComponent {
  viagemEstatisticas:ViagensEstatistica[]=[]
  labelChart:String[]=[]
  dataChart:number[]=[]


  constructor(private relatorioService: RelatoriosService) {}

  ngOnInit(): void {
    this.buscarEstatisticaDoHistoricoDeViagem()
  }

  //Chamar a API de estatística
  buscarEstatisticaDoHistoricoDeViagem() {
    this.relatorioService.getHistoricoViagensEstatisticas$().subscribe({
      next: (resposta) => {
        this.viagemEstatisticas = resposta,
        //Preenche os Labels do gráfico
        this.labelChart = this.viagemEstatisticas.map(item => item.status),
        this.dataChart = resposta.map(item => item.quantidade),

        console.log(this.viagemEstatisticas);
      },
      error: (errorResposta) => console.log(errorResposta),
    });
  }

  //define o tipo
  public barChartType: ChartType = 'doughnut';

  //alimenta o gráfico - pensar de forma dinâmica talvez em ngOnInit()
  public barChartData: ChartData<'bar'> = {
   // labels: ['Solicitada', 'Confirmada', 'Concluida'],
    labels: [this.labelChart] ,
    datasets: [
        { data: this.dataChart, label: 'Series A' },
       { data: [65, 59], label: 'Series A' },
      // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  }


}
