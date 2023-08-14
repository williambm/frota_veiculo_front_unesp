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
    this.veiculoService.create(this.veiculo).subscribe(resposta=>{
      this.toast.info(`O veículo ${resposta.fabricante} ${resposta.modelo} foi cadastrado com sucesso`,'SUCESSO')
      this.route.navigate(['/veiculos'])
    },
    responseError => {
      if (responseError.error.errors) {
        responseError.error.errors.forEach((element: { message: string | undefined; fieldName: string | undefined; }) => {
          this.toast.error(element.message, element.fieldName)
        });
      } else {
        this.toast.error(`${responseError.error.message}`, `${responseError.error.error}`)
      }
    }
    )
    console.log(this.veiculo)
  }
}
