export interface Veiculo {
  id?: any;
  placa: string;
  fabricante: string;
  modelo: string;
  totalPassageiros?: number;
  quilometragem?: number;
  anoFabricacao?: number;
  possuiCacamba: boolean;
}
