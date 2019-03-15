import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any  = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Dashboard',
          url: '/dashboard'
        },
        {
          titulo: 'Progress Bar',
          url: '/progress'
        },
        {
          titulo: 'Gráficos',
          url: '/graph1'
        },
        {
          titulo: 'Promesas',
          url: '/promises'
        },
        {
          titulo: 'Rxjs',
          url: '/rxjs'
        }
      ]
    }
  ];
  constructor() { }
}
