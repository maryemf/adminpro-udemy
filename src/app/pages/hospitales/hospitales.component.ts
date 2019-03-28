import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, ModalUploadService } from 'src/app/services/service.index';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  loading: boolean = false;
  desde: number = 0;
  totalReg: number;
  hospitales: Hospital[] = [];

  constructor(public _hospital: HospitalService, public _modalUpload: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUpload.notificacion
      .subscribe( () => this.cargarHospitales());
  }

  cargarHospitales() {
    this.loading = true;
    this._hospital.cargarHospitales(this.desde)
      .subscribe( (resp: any) => {
        this.totalReg = resp.totalCount;
        this.hospitales = resp.hospitales;
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
    this.cargarHospitales();
  }

  actualizarHospital(hospital: Hospital) {
    this._hospital.actualizarHospital( hospital )
      .subscribe();
  }

  borrarHospital( hospital: Hospital) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._hospital.borrarHospital( hospital._id)
          .subscribe ( (resp: boolean) => {
            console.log(resp);
            this.cargarHospitales();
          }) ;
      }
    });
  }

  buscarHospital( term: string) {
    if (term.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this.loading = true;
    this._hospital.buscarHospital(term)
      .subscribe( (hospital: Hospital[]) => {
        this.hospitales = hospital;
        this.loading = false;
      } );
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: ['Cancelar', 'Guardar'],
      dangerMode: true
    })
    .then((value) => {
      if (value && value.length > 0) {
         this._hospital.crearHospital(value)
           .subscribe( (resp: Hospital ) => {
              this.cargarHospitales();
           });
      }
    });
  }

  actualizarImagen( hospital: Hospital) {
    this._modalUpload.mostrarModal('hospitales', hospital._id);
  }

}
