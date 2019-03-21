import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  email: string;
  auth2: any;

  constructor( public router: Router, public _usuario: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
    this.googleInit();
  }

  // Google signIn
  attachSignin (element) {
    this.auth2.attachClickHandler( element, {}, googleUser => {
      const token = googleUser.getAuthResponse().id_token;
      // const profile = googleUser.getBasicProfile();
      console.log(token);
      this._usuario.loginGoogle( token).subscribe ( () => window.location.href = '#/dashboard');
    });
  }

  googleInit() {
    gapi.load( 'auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1033884498723-2nu2t6oi34vus11jrbkkjqda0q71god2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }

  ingresar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const usuario = new Usuario(null, form.value.email, form.value.password);
    this._usuario.login(usuario, form.value.recuerdame).subscribe( login => this.router.navigate(['/dashboard']));
  }

}
