import { Paginacao } from './../../../model/paginacao';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Veiculo } from 'src/app/model/veiculo';
import { Viagem } from 'src/app/model/viagem';
import { VeiculosService } from 'src/app/services/veiculos.service';
import { ViagensService } from 'src/app/services/viagens.service';

@Component({
  selector: 'app-viagem-create',
  templateUrl: './viagem-create.component.html',
  styleUrls: ['./viagem-create.component.css'],
})
export class ViagemCreateComponent {

  viagens: Viagem = {
    solicitanteId: '',
    //motoristaNome: '',
    cep: '',
    logradouro: '',
    //numero: 0,
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    campusOrigem: '',
    //veiculoModelo: '',
    dataViagem: '',
  };

  veiculos:Veiculo={}
  //viagens: Viagem | any = {};

  //Usado para popular select do formulario
  cargaDeVeiculos:Veiculo[][]=[];
  veiculosSemPaginacao:Veiculo[]=[];
  veiculosArray:Veiculo[]=[]
  veiculo$=this.veiculosService.findAllPaginadoV2$(0,50);

  constructor(
    private datePipe: DatePipe, //Pipe de datas do angular para ajustar datas
    private toast: ToastrService,
    private viagensService: ViagensService,
    private veiculosService: VeiculosService,
    private route: Router
  ) {}

  ngOnInit():void{
    this.carregarVeiculos()
    this.carregarVeiculosDaAPI()
  }

  solicitanteNome: FormControl = new FormControl(null, Validators.required);
  cep: FormControl = new FormControl(null, Validators.required);
  logradouro: FormControl = new FormControl(null, Validators.required);
  numero: FormControl = new FormControl(null, Validators.required);
  complemento: FormControl = new FormControl(null, Validators.required);
  bairro: FormControl = new FormControl(null, Validators.required);
  cidade: FormControl = new FormControl(null, Validators.required);
  estado: FormControl = new FormControl(null, Validators.required);
  campusOrigem: FormControl = new FormControl(null, Validators.required);
  statusViagem: FormControl = new FormControl(null, Validators.required);
  veiculoModelo: FormControl = new FormControl(null, Validators.required);
  dataViagem: FormControl = new FormControl(null, Validators.required);

  validaCampos() {
    return (
      this.cep.valid &&
      this.logradouro.valid &&
      this.numero.valid &&
      this.complemento.valid &&
      this.bairro.valid &&
      this.cidade.valid &&
      this.estado.valid &&
      this.campusOrigem.valid &&
      this.dataViagem
    );
  }

  //TODO: Implementar a alimentação o select de veiculos de forma dinâmica via API - Hoje está estático.
  carregarVeiculos(){
    //Hoje faço um EAGER destes dados - futuramente achar melhor tecnica para isso
    this.veiculosService.findAllPaginado(0, 5).subscribe((resposta) => {
      this.cargaDeVeiculos = resposta.content;
      //resposta.content
      console.log(this.cargaDeVeiculos)

      // this.cargaDeVeiculos.forEach(element => this.veiculosSemPaginacao.push(
      //   this.veiculoItem.id = element.
      // ));
    });
  }

  criar(){
    const formattedDataViagem = this.datePipe.transform(this.viagens.dataViagem, 'yyyy-MM-dd');

    //Composição dos dados de Viagem
    this.viagens.dataViagem = `${formattedDataViagem}`
    this.viagens.solicitanteId = `${sessionStorage.getItem('matricula')}`

    this.viagensService.create(this.viagens).subscribe(resposta=>{
      this.toast.info(`Viagem solicitada com sucesso`,'SUCESSO')
      this.route.navigate(['/viagens'])
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
  }

  carregarVeiculosDaAPI() {
    this.veiculosService.findAllPaginadoV2$(0,50)
    .subscribe({
      next:resposta=>{console.log(resposta), this.veiculosArray = resposta.content},
      error:respostaErro=>console.log(respostaErro),
      complete:()=>console.log('Fim da execução do observable de findAllPaginadoV2')
    })
  }
}
