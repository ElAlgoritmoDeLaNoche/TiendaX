import { AuthService } from '@core/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(private auth: AuthService, private router: Router) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Primero comprobar que existe sesión
    if (this.auth.getSession() !== null) {
      console.log('Hay una sesión, estamos logueados');
      const dataDecode = this.decodeToken();
      console.log(dataDecode);
      // Comprobar que no esta caducado el token
      if (dataDecode.exp < new Date().getTime() / 1000) {
        console.log('Sesión caducada');
        return this.redirect();
      }
      // El role del usuario es ADMIN
      if (dataDecode.user.role === 'ADMIN'){
        console.log('Somos administradores');
        return true;
      }
    }
    console.log('No somos administradores');
    return this.redirect();
  }

  redirect(){
    this.router.navigate(['/login']);
    return false;
  }

  decodeToken(){
    return jwtDecode(this.auth.getSession().token);
  }
}
