import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor( public route: ActivatedRoute, public http: HttpClient) {
    route.params.subscribe( params => {
      const term = params['term'];
      console.log(term);
      this.buscar( term );
    });
  }

  ngOnInit() {
  }

  buscar ( term: string ) {
    const url = URL_SERVICES + '/busqueda/todo/' + term;
    this.http.get( url )
      .subscribe( (resp: any) => {
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
      });
  }

}
