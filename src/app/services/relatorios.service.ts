import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/endpoints';
import { ViagensEstatistica } from '../model/viagensEstatistica';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(private http: HttpClient) { }

  getHistoricoViagensEstatisticas$ = (): Observable<ViagensEstatistica[]> =>
  this.http.get<ViagensEstatistica[]>(`${API_CONFIG.baseUrl}/relatorios/estatistiscas/viagens-solicitacao`);
}
