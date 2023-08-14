import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Veiculo } from 'src/app/model/veiculo';
import { VeiculosService } from 'src/app/services/veiculos.service';

@Component({
  selector: 'app-veiculo-create',
  templateUrl: './veiculo-create.component.html',
  styleUrls: ['./veiculo-create.component.css'],
})
export class VeiculoCreateComponent {
  constructor(
    private toast: ToastrService,
    private route: Router,
    private veiculoService: VeiculosService
  ) {}

  veiculo: Veiculo = {
    placa: '',
    fabricante: '',
    modelo: '',
    // totalPassageiros: 0,
    // quilometragem: 0,
    // anoFabricacao: 0,
    possuiCacamba: false,
  };

  placa:FormControl = new FormControl(null,Validators.required)
  fabricante:FormControl = new FormControl(null,Validators.minLength(2))
  modelo:FormControl = new FormControl(null,Validators.minLength(2))
  totalPassageiros:FormControl = new FormControl(null,Validators.required)
  quilometragem:FormControl = new FormControl(null,Validators.required)
  anoFabricacao:FormControl = new FormControl(null,Validators.required)
  possuiCacamba:FormControl = new FormControl(null,Validators.required)

  validaCampos(){
    return(
      this.placa.valid &&
      this.fabricante.valid &&
      this.modelo.valid &&
      this.totalPassageiros.valid &&
      this.quilometragem.valid &&
      this.anoFabricacao.valid &&
      this.possuiCacamba.valid 
    )
  }

  criar(){
    console.log(this.veiculo)
  }
}
