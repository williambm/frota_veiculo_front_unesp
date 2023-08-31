import { Component } from '@angular/core';

@Component({
  selector: 'app-viagens-estatisticas',
  templateUrl: './viagens-estatisticas.component.html',
  styleUrls: ['./viagens-estatisticas.component.css']
})
export class ViagensEstatisticasComponent {
// Dados de exemplo
// public barChartOptions = {
//   scaleShowVerticalLines: false,
//   responsive: true,
// };
// public barChartLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
// public barChartType = 'bar';
// public barChartLegend = true;
// public barChartData = [
//   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Série A' },
//   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Série B' },
// ];
colorScheme = {
  domain: ['#5AA454', '#E44D25'],
};

dados = [
  {
    name: 'marco',
    series: [
      { name: 'Viagens Solicitadas', value: 10 },
      { name: 'Viagens Atribuídas', value: 5 },
    ],
  },
  {
    name: 'abril',
    series: [
      { name: 'Viagens Solicitadas', value: 15 },
      { name: 'Viagens Atribuídas', value: 12 },
    ],
  }
];

}
