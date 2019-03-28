import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  usuario: Usuario;

  constructor( public http: HttpClient, public _usuario: UsuarioService) {
    this.usuario = this._usuario.usuario;
  }

  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICES + '/hospital?desde=' + desde;
    return this.http.get(url);
  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICES + '/hospital/' + id;
    return this.http.get(url);
  }

  borrarHospital( id: string ) {
    let url = URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this._usuario.token;

    return this.http.delete( url )
      .pipe( map ( (resp: any) => {
        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
      } ));
  }

  crearHospital( nombre: string ) {
    let url = URL_SERVICES + '/hospital';
    url += '?token=' + this._usuario.token;
    const hospital: Hospital = {
      nombre: nombre,
      usuario: this.usuario._id
    };
    return this.http.post( url, hospital )
      .pipe( map ( (resp: any)  => {
        swal ('Hospital creado', hospital.nombre, 'success');
        return resp.hospital;
      }));
  }

  buscarHospital( term: string ) {
    const url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + term;
    return this.http.get(url)
      .pipe( map ( (resp: any) => resp.hospitales ));
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this._usuario.token;
    return this.http.put( url, hospital )
      .pipe( map ( (resp: any)  => {
        swal ('Hospital actualizado', hospital.nombre, 'success');
        return resp.hospital;
        // return true;
      }));
  }
}
