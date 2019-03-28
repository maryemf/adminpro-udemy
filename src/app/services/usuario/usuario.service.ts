import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router, public _archivo: SubirArchivoService) {
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.token = '';
    this.router.navigate(['/login']);
  }

  estaLogueado() {
    return this.token && this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  login( usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/login';
    return this.http.post(url, usuario).pipe( map ( (res: any) => {
      this.guardarStorage(res.id, res.token, res.usuario);
      return true;
    }));
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICES + '/login/google';
    return this.http.post( url, { token }).pipe(
      map( ( (res: any)  => {
        console.log(res);
        this.guardarStorage(res.id, res.token, res.usuario);
        return true;
      }))
    );
  }

  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICES + '/usuario';
    return this.http.post( url, usuario )
      .pipe( map ( (resp: any)  => {
        swal ('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));

  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICES + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put( url, usuario )
      .pipe( map ( (resp: any)  => {
        if ( usuario._id === this.usuario._id ) {
          const usuarioDB = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        }
        swal ('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }));
  }

  cambiarImagen (archivo: File, id: string) {
    this._archivo.subirArchivo(archivo, 'usuarios', id)
      .then( (resp: any) => {
        // console.log(this.usuario.img, resp.usuario.img);
        this.usuario.img = resp.usuario.img;
        swal ('Imagen de usuario actualizado', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
        // console.log(resp);
      })
      .catch( resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICES + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios( term: string ) {
    const url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + term;
    return this.http.get(url)
      .pipe( map ( (resp: any) => resp.usuarios ));
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICES + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
      .pipe( map ( (resp: any) => {
        swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      } ));
  }
}
