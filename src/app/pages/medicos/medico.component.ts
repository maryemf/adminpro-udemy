import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService, HospitalService, ModalUploadService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor( public _medico: MedicoService, public _hospital: HospitalService, public router: Router, route: ActivatedRoute, public _modalUpload: ModalUploadService) {
    route.params.subscribe( params => {
      const id = params['id'];
      // console.log('id', id);
      if (id !== 'nuevo') {
        this.cargarMedico( id);
      }
    });
  }

  ngOnInit() {
    this._hospital.cargarHospitales()
      .subscribe( (resp: any) => this.hospitales = resp.hospitales);
    this._modalUpload.notificacion
      .subscribe( (resp: any) => {
        this.medico.img = resp.medico.img;
      });
  }

  guardarMedico (f: NgForm) {
    // console.log(f.value);
    // console.log(f.valid);

    if (f.invalid) {
      return;
    }

    this._medico.guardarMedico( this.medico)
      .subscribe( medico => {
        // console.log( medico );
        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
      });
  }

  cambiarHospital( id: string ) {
    this._hospital.obtenerHospital(id)
      .subscribe( (hosp: any) => this.hospital = hosp.hospital);
  }

  cargarMedico( id: string) {
    this._medico.cargarMedico(id)
      .subscribe( medico => {
        // console.log('medico', medico);
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambiarHospital(this.medico.hospital);
      });
  }

  cambiarFoto() {
    this._modalUpload.mostrarModal('medicos', this.medico._id);
  }
}
