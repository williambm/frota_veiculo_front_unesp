import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginacao } from '../model/paginacao';
import { API_CONFIG } from '../config/endpoints';
import { Veiculo } from '../model/veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  constructor(private http: HttpClient) {}

  findAllPaginado(
    page: number,
    size: number
  ): Observable<Paginacao<Veiculo[]>> {
    return this.http.get<Paginacao<Veiculo[]>>(
      `${API_CONFIG.baseUrl}/veiculos?page=${page}&size=${size}&sort=id`
    );
  }

  findById(pathParamId: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(
      `${API_CONFIG.baseUrl}/veiculos/${pathParamId}`
    );
  }

  create(veiculo:Veiculo): Observable<Veiculo>{
    return this.http.post<Veiculo>(`${API_CONFIG.baseUrl}/veiculos`,veiculo);
  }

  update(veiculo:Veiculo): Observable<Veiculo>{
    return this.http.put<Veiculo>(`${API_CONFIG.baseUrl}/veiculos/${veiculo.id}`,veiculo);
  }

  delete(veiculo:Veiculo): Observable<Veiculo> {
    return this.http.delete<Veiculo>(
      `${API_CONFIG.baseUrl}/veiculos/${veiculo.id}`);
  }

  //Outra forma de Criar um observable - por convenção essa variáel de fim $ representa a execução desta função/Observable
  findAllPaginadoV2$ = (page: number, size: number): Observable<Paginacao<Veiculo>> =>
    this.http.get<Paginacao<Veiculo>>(`${API_CONFIG.baseUrl}/veiculos?page=${page}&size=${size}&sort=id`);


}
