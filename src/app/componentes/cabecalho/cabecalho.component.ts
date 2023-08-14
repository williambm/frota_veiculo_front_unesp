import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioSession } from 'src/app/model/usuarioSession';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent {

  private usuarioSessao: UsuarioSession = {
    email: '',
    nome: '',
    perfil: '',
  };
  public saudacao:string = ''

  constructor(private router: Router) {} // Injete o Router

  ngOnInit(): void {
    // Verifica se há algo no sessionStorage e se o usuário não está na página de login
    if (this.exibirSaudacao() && !this.router.url.includes('/auth')) {
      this.saudar();
    }
  }

  exibirSaudacao(): boolean {
    return sessionStorage.length > 1;
  }

  saudar(){
    const horaAtual = new Date().getHours();

    if (horaAtual >= 0 && horaAtual <= 11) {
      this.saudacao = 'Bom dia';
    } else if (horaAtual > 11 && horaAtual <= 18) {
      this.saudacao = 'Boa tarde';
    } else {
      this.saudacao = 'Boa noite';
    }

    this.saudacao = `${this.saudacao} ${sessionStorage.getItem('nome')}`
  }
}
