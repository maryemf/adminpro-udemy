import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {

  @ViewChild('txtPorcentaje') txtPorcentaje: ElementRef; // referencia a objeto html con un identificador #txtPorcent
  @Input() porcentaje: number = 50;
  @Input('nombre') leyenda: string = 'Leyenda';
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cambiarValor( valor: number ) {
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }
    this.porcentaje += valor;
    this.cambioValor.emit( this.porcentaje );
  }

  onChange( newValue: number) {
    // const elemHTML: any = document.getElementsByName('porcentaje')[0];

    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }
    // elemHTML.value = newValue;
    this.txtPorcentaje.nativeElement.value = this.porcentaje;
    this.cambioValor.emit( this.porcentaje );
    this.txtPorcentaje.nativeElement.focus();
  }
}
