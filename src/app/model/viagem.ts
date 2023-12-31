export interface Viagem {
    'id'?: any,
    'solicitanteId'?: any,
    'solicitanteNome'?: string,
    'motoristaId'?: any,
    'motoristaNome'?: string,
    'veiculoId'?: any,
    'cep': string,
    'logradouro': string,
    'numero'?: number,
    'complemento': string,
    'bairro': string,
    'cidade': string,
    'estado': string,
    'campusOrigem': string,
    'statusViagem'?: string,
    'veiculoModelo'?: string,
    'dataViagem': string
}