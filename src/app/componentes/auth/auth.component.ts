import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/model/credenciais';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  //Objeto utilizado na autenticação
  cred: Credenciais = {
    email: '',
    senha: '',
  };

  constructor(
    private authService: AutenticacaoService,
    private toast: ToastrService,
    private route: Router
  ) {}

  isEmailValid = new FormControl(null, Validators.email);
  isSenhaValid = new FormControl(null, Validators.minLength(3));

  isFormInvalido(): boolean {
    if (this.isEmailValid.valid && this.isSenhaValid.valid) {
      return false;
    } else {
      return true;
    }
  }

  login() {
    //Comunicar com o serviço de login, colocar token no LocalStorage e redirecionar para home
    this.authService.autenticar(this.cred).subscribe(
      (resposta) => {
        this.authService.loginSucesso(`${resposta.body}`);

        this.route.navigate(['']);
      },
      (error) => this.toast.error('Usuário ou senha incorreto', 'Erro de login')
    );
  }
}
