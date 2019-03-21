import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupedObservable } from 'rxjs';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor( public _usuario: UsuarioService, public router: Router ) { }

  sonIguales(c1: string, c2: string) {
    return (group: FormGroup) => {
      const camp1 = group.controls[c1].value;
      const camp2 = group.controls[c2].value;
      if (camp1 === camp2) {
        return null;
      }

      return { sonIguales: true };
    };
  }

  ngOnInit() {
    init_plugins();
    this.form = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl( false )
    }, {validators: this.sonIguales('password', 'password2') });

    this.form.setValue({
      nombre: 'Test',
      correo: 'test1@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });

  }

  registro() {
    if (this.form.invalid) {
      return;
    }
    if (!this.form.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    const values = this.form.value;
    const usuario = new Usuario( values.nombre, values.correo, values.password );
    this._usuario.crearUsuario(usuario).subscribe( resp => this.router.navigate(['login']));
  }

}
