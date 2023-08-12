import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    private router: Router,
    private authService: AutenticacaoService,
    private toast: ToastrService,
  ){}

  ngOnInit():void{
    this.router.navigate(['/home'])
  }

  validaRenderizacao():string{
    return this.authService.getPerfilUsuario()
  }

  logout(){
    this.authService.logout()
    this.toast.info("logout realizado com sucesso","logout",{timeOut:2000})
    this.router.navigate(['/auth'])
  }
}
