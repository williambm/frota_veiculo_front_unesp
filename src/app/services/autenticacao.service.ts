import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciais } from '../model/credenciais';
import { API_CONFIG } from '../config/endpoints';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioSession } from '../model/usuarioSession';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  jwtService = new JwtHelperService();

  //Inicialização do model de usuario
  private usuario: UsuarioSession = {
    nome: '',
    email: '',
    perfil: '',
  };

  constructor(private http: HttpClient, private toast: ToastrService) {}

  autenticar(dadoslogin: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, dadoslogin, {
      observe: 'response',
      responseType: 'text',
    });
  }

  loginSucesso(token: string) {
    if (token.length > 0 && token != null) {
      localStorage.setItem('token', token);

      this.persistDadosUsuario(token);
    } else {
      this.toast.error(
        'Problema com o token de autenticação',
        'Erro - Autenticação'
      );
    }
  }

  persistDadosUsuario(token: string): void {
    let descodeToken = this.jwtService.decodeToken(`${token}`);
    sessionStorage.setItem('nome', descodeToken.nome);
    sessionStorage.setItem('email', descodeToken.email);
    sessionStorage.setItem('perfil', descodeToken.roles);
  }

  isAutenticado(): boolean {
    let token = localStorage.getItem('token');

    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    } else {
      return false;
    }
  }

  getPerfilUsuario(): string {
    return `${sessionStorage.getItem('perfil')}`;
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('nome');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('perfil');
  }
}
