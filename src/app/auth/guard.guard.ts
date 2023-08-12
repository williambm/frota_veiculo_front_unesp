// Forma como o Angular 16 cria o guard - Não usa uma classe
// import { CanActivateFn } from '@angular/router';

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { AutenticacaoService } from "../services/autenticacao.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    let autenticado = this.authService.isAutenticado();

    if(!autenticado){
      console.log(autenticado)
      this.router.navigate(['/auth'])
      return false
    }

    return true
  }

}
