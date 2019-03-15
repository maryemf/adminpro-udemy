import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then ( mensaje  => console.log('Terminó!! ' + mensaje) )
           .catch( error => console.error( 'Error en la promesa ', error) );
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let cont = 0;
      const intervalo = setInterval( () => {
        cont += 1;
        console.log(cont);
        if (cont === 3) {
          resolve(true);
          // reject ('Simple error! ');
          clearInterval( intervalo);
        }
      }, 1000 );
    } );
  }

}