export class CEPInvalidoErro extends Error {

 // cep:String='';

  constructor(cep:string){
    super(`CEP em formato inválido! O CEP deve ser no formato 00000-000, o informado foi ${cep}`)
  }
}
