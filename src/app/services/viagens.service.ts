import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viagem } from '../model/viagem';
import { Paginacao } from '../model/paginacao';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ViagensService {

  perfilUsuario:string =''
  matriculaUsuario:string =''

  constructor(private http: HttpClient) {}  

  findAllPaginadoByPerfil(page: number, size: number):Observable<Paginacao<Viagem[]>> {
    this.verificaPerfilUsuario();

    if(this.perfilUsuario == 'ADMIN' || this.perfilUsuario == 'MOTORISTA'){
      return this.http.get<Paginacao<Viagem[]>>(
        `${API_CONFIG.baseUrl}/viagens?page=${page}&size=${size}`
      );
    }else{
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

  verificaPerfilUsuario(){
    this.perfilUsuario = `${sessionStorage.getItem('perfil')}`
    this.matriculaUsuario = `${sessionStorage.getItem('matricula')}`
  }

  create(viagem: Viagem): Observable<Viagem> {
    return this.http.post<Viagem>(
      `${API_CONFIG.baseUrl}/viagens`,
      viagem
    );
  }

}
