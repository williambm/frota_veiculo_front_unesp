import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Veiculo } from 'src/app/model/veiculo';
import { VeiculosService } from 'src/app/services/veiculos.service';

@Component({
  selector: 'app-veiculo-delete',
  templateUrl: './veiculo-delete.component.html',
  styleUrls: ['./veiculo-delete.component.css'],
})
export class VeiculoDeleteComponent {
  constructor(
    private toast: ToastrService,
    private route: Router,
    private routerPath: ActivatedRoute,
    private veiculoService: VeiculosService
  ) {}

  ngOnInit(): void {
    this.veiculo.id = this.routerPath.snapshot.paramMap.get('id');
    this.findById();
  }

  veiculo: Veiculo = {
    placa: '',
    fabricante: '',
    modelo: '',
    possuiCacamba: false,
  };

  placa: FormControl = new FormControl(null, Validators.required);
  fabricante: FormControl = new FormControl(null, Validators.minLength(2));
  modelo: FormControl = new FormControl(null, Validators.minLength(2));
  totalPassageiros: FormControl = new FormControl(null, Validators.required);
  quilometragem: FormControl = new FormControl(null, Validators.required);
  anoFabricacao: FormControl = new FormControl(null, Validators.required);
  possuiCacamba: FormControl = new FormControl(false, Validators.required);

  findById() {
    this.veiculoService.findById(this.veiculo.id).subscribe((resposta) => {
      this.veiculo = resposta;
    });
  }

  excluir() {
    this.veiculoService.delete(this.veiculo).subscribe(
      (resposta) => {
        this.toast.info(
          `O Veículo foi excluído com sucesso!`,
          'Exclusão de Veículo'
        ),
          this.route.navigate(['veiculos']);
      },
      (responseError) => {
        if (responseError.error.errors) {
          responseError.error.errors.forEach(
            (element: {
              message: string | undefined;
              fieldName: string | undefined;
            }) => {
              this.toast.error(element.message, element.fieldName);
            }
          );
        } else {
          this.toast.error(
            `${responseError.error.message}`,
            `${responseError.error.error}`
          );
        }
      }
    );
  }
}
