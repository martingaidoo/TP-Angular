import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor( private router: Router, private authService: AuthService) {}

  async canActivate(//verifica el token del usuario si es valido
  ) {
    try {
      const resultado = await this.authService.validateToken();
      if (resultado) {
        return true;
      }
      else {
        this.router.navigate(['login']);
        return false;
      }
    } catch (error) {
      this.router.navigate(['login']);
      return false;
    }
  }
}
