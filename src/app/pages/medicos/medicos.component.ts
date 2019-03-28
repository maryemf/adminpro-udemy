import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  desde: number = 0;
  medicos: Medico[] = [];
  totalReg: number = 0;
  constructor( public _medico: MedicoService ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medico.cargarMedicos(this.desde)
      .subscribe( medicos => {
        this.medicos = medicos;
        this.totalReg = this._medico.totalMedicos;
      } );
  }

  buscarMedico( term: string ) {
    if (term.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medico.buscarMedico(term)
      .subscribe( medicos => this.medicos = medicos );
  }

  borrarMedico( medico: Medico) {
    this._medico.borrarMedico( medico._id)
      .subscribe( () => this.cargarMedicos() ) ;
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
    this.cargarMedicos();
  }

}
