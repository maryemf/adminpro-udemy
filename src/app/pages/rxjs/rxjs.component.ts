import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subsription: Subscription;

  constructor() {

  this.subsription = this.regresaObs()/*.pipe (
    retry(2)
  )*/
  .subscribe(
      num => console.log('Subs', num) ,
      error => console.error( 'Error en el obs', error ) ,
      () => console.log('Terminó!!')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.subsription.unsubscribe();
  }

  regresaObs(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let cont = 0;
      const interval = setInterval( () => {
        cont += 1;
        const salida = {
          valor: cont
        };
        observer.next(salida);
        // if (cont === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if (cont === 2) {
        //   // clearInterval(interval);
        //   observer.error('Auxilio!!');
        // }
      }, 1000);
    }). pipe (
      map( resp => {
          return resp.valor;
      }),
      filter( ( valor , index) => {
        if ((valor % 2 === 1)) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
