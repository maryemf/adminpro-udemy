import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuario: UsuarioService, public router: Router) {}
  canActivate(): boolean {
    if (this._usuario.estaLogueado()) {
      console.log('Paso el guard');
      return true;
    } else {
      console.log('No paso el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
