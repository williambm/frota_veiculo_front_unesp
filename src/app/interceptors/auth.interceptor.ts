import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authServer:AutenticacaoService,
    private router:Router
    ){}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    //verifica se o token existe e se na URL não é a de login /auth nela não teremos um token válido ainda
    if (token && !request.url.includes('/auth')) {
      //verifica se o token é valido, caso tenha expirado desloga
      if(!this.authServer.isAutenticado()){
        this.router.navigate(['/'])
      }
      const cloneReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });

      return next.handle(cloneReq);
    } else {
      return next.handle(request);
    }
  }
}

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
