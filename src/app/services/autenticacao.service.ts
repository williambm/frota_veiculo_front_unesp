import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciais } from '../model/credenciais';
import { API_CONFIG } from '../config/endpoints';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  jwtService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  autenticar(dadoslogin: Credenciais) {
    console.log(`${API_CONFIG.baseUrl}/auth/login`);

    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, dadoslogin, {
      observe: 'response',
      responseType: 'text',
    });
  }

  loginSucesso(token: string) {
    if (token.length > 0 && token != null) {
      localStorage.setItem('token', token);
    } else {
      //todo: Notifica erro de token
    }
  }

  isAutenticado(): boolean {
    let token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    } else {
      return false;
    }
  }

  logout(){
    localStorage.removeItem('token')
  }
}
