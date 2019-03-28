import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
// import swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalReg: number = 0;
  loading: boolean = true;

  constructor(public _usuario: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }
  cargarUsuarios() {
    this.loading = true;
    this._usuario.cargarUsuarios(this.desde)
      .subscribe( (resp: any) => {
        // console.log(resp);
        this.totalReg = resp.totalCount;
        this.usuarios = resp.usuarios;
        this.loading = false;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalReg) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( term: string) {
    if (term.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.loading = true;
    this._usuario.buscarUsuarios(term)
      .subscribe( (usuario: Usuario[]) => {
        this.usuarios = usuario;
        this.loading = false;
      } );
  }

  borrarUsuario( usuario: Usuario) {
    // console.log(usuario);
    if (usuario._id === this._usuario.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuario.borrarUsuario( usuario._id)
          .subscribe ( (resp: boolean) => {
            console.log(resp);
            this.cargarUsuarios();
          }) ;
      }
    });
  }

  actualizarUsuario(usuario: Usuario){
    this._usuario.actualizarUsuario( usuario )
      .subscribe();
  }

}
