import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/endpoints';
import { Funcionario } from '../model/funcionario';
import { Paginacao } from '../model/paginacao';

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  constructor(private http: HttpClient) {}

  findAllPaginado(
    page: number,
    size: number
  ): Observable<Paginacao<Funcionario[]>> {
    return this.http.get<Paginacao<Funcionario[]>>(
      `${API_CONFIG.baseUrl}/funcionarios?page=${page}&size=${size}&sort=matricula`
    );
  }

  findById(pathParamId: number): Observable<Funcionario> {    
    return this.http.get<Funcionario>(
      `${API_CONFIG.baseUrl}/funcionarios/${pathParamId}`
    );
  }

  create(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(
      `${API_CONFIG.baseUrl}/funcionarios`,
      funcionario
    );
  }

  update(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(
      `${API_CONFIG.baseUrl}/funcionarios/${funcionario.matricula}`, funcionario
    );
  }

  delete(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.delete<Funcionario>(
      `${API_CONFIG.baseUrl}/funcionarios/${funcionario.matricula}`);
  }
}
