import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viagem } from '../model/viagem';
import { Paginacao } from '../model/paginacao';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/endpoints';
import { Motorista } from '../model/motorista';
import { Cep } from '../model/cep';
import { CEPInvalidoErro } from './errors/cepInvalidoErro';

@Injectable({
  providedIn: 'root',
})
export class ViagensService {
  perfilUsuario: string = '';
  matriculaUsuario: string = '';

  constructor(private http: HttpClient) {}

  findAllPaginadoByPerfil(
    page: number,
    size: number
  ): Observable<Paginacao<Viagem[]>> {
    this.verificaPerfilUsuario();

    if (this.perfilUsuario == 'ADMIN' || this.perfilUsuario == 'MOTORISTA') {
      return this.http.get<Paginacao<Viagem[]>>(
        `${API_CONFIG.baseUrl}/viagens?page=${page}&size=${size}`
      );
    } else {
      return this.http.get<Paginacao<Viagem[]>>(
        `${API_CONFIG.baseUrl}/viagens/funcionario/${this.matriculaUsuario}?page=${page}&size=${size}`
      );
    }
  }

  findById(pathParamId: number): Observable<Viagem> {
    return this.http.get<Viagem>(
      `${API_CONFIG.baseUrl}/viagens/${pathParamId}`
    );
  }

  verificaPerfilUsuario() {
    this.perfilUsuario = `${sessionStorage.getItem('perfil')}`;
    this.matriculaUsuario = `${sessionStorage.getItem('matricula')}`;
  }

  create(viagem: Viagem): Observable<Viagem> {
    return this.http.post<Viagem>(`${API_CONFIG.baseUrl}/viagens`, viagem);
  }

  atribuirMotorista(viagemId: Viagem, motorista: Motorista): Observable<void> {
    return this.http.post<void>(
      `${API_CONFIG.baseUrl}/viagens/${viagemId}/motorista`,
      motorista
    );
  }

  pesquisaCep$ = (cep: string): Observable<Cep> => {
    if (cep != null && cep != '' && cep.length > 5) {
      return this.http.get<Cep>(`${API_CONFIG.cepPesquisa}/${cep}/json`);
    }else{
      throw new CEPInvalidoErro(cep);
    }
  };
}
