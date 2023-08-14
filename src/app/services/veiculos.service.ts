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
      `${API_CONFIG.baseUrl}/veiculos?page=${page}&size=${size}`
    );
  }

  create(veiculo:Veiculo): Observable<Veiculo>{
    return this.http.post<Veiculo>(`${API_CONFIG.baseUrl}/veiculos`,veiculo);
  }

}
