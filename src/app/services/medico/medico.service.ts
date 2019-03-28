import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;
  constructor( public http: HttpClient, public _usuario: UsuarioService ) { }

  cargarMedicos(desde: number = 0) {
    const url = URL_SERVICES + '/medico?desde=' + desde;
    return this.http.get(url)
      .pipe( map ( (resp: any) => {
        this.totalMedicos = resp.totalCount;
        return resp.medicos;
      }) );

  }

  buscarMedico( term: string ) {
    const url = URL_SERVICES + '/busqueda/coleccion/medicos/' + term;
    return this.http.get(url)
      .pipe( map ( (resp: any) => resp.medicos ));
  }

  borrarMedico( id: string ) {
    let url = URL_SERVICES + '/medico/' + id;
    url += '?token=' + this._usuario.token;

    return this.http.delete( url )
      .pipe( map ( (resp: any) => {
        swal('Médico borrado', 'El médico ha sido eliminado correctamente', 'success');
        return resp;
      } ));
  }

  guardarMedico( medico: Medico) {
    let url = URL_SERVICES + '/medico';

    if (medico._id) {
      url += '/' + medico._id;
      url += '?token=' + this._usuario.token;
      return this.http.put( url, medico)
      .pipe( map ( (resp: any) => {
        swal('Médico Actualizado', medico.nombre, 'success');
        return resp.medico;
      }) );

    } else {
      url += '?token=' + this._usuario.token;
      return this.http.post( url, medico)
      .pipe( map ( (resp: any) => {
        swal('Médico Creado', medico.nombre, 'success');
        return resp.medico;
      }) );
    }

  }

  cargarMedico( id: string) {
    let url = URL_SERVICES + '/medico/' + id;
    url += '?token=' + this._usuario.token;

    return this.http.get(url)
      .pipe( map ( (resp: any) => resp.medico ));

  }

}
