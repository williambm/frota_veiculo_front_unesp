import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciais } from '../model/credenciais';
import { API_CONFIG } from '../config/endpoints';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioSession } from '../model/usuarioSession';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  jwtService = new JwtHelperService();

  //Inicialização do model de usuario
  private usuario: UsuarioSession={
    nome:'',
    email:'',
    perfil:''
  };

  constructor(
    private http: HttpClient) {}

  autenticar(dadoslogin: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, dadoslogin, {
      observe: 'response',
      responseType: 'text',
    });
  }

  loginSucesso(token: string) {
    if (token.length > 0 && token != null) {
      localStorage.setItem('token', token);

      this.persistDadosUsuario(token)

    } else {
      //todo: Notifica erro de token
    }
  }

  persistDadosUsuario(token:string):void{
    //todo: vou trabalhar com o LocalStorage para colocar alguns dados do usuário no armazenamento e asim renderizar a tela de acordo com o perfil
    //Descobrir depois se é a melhor estratégia
    let descodeToken = this.jwtService.decodeToken(`${token}`)
    sessionStorage.setItem('nome',descodeToken.nome)
    sessionStorage.setItem('email',descodeToken.email)
    sessionStorage.setItem('perfil',descodeToken.roles)

    //TODO: rEMOVER DEPOIS ESSE DEBUG
    console.log(this.usuario);

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
