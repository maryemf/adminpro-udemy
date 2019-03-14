import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-graph-doughnut',
  templateUrl: './graph-doughnut.component.html',
  styles: []
})
export class GraphDoughnutComponent implements OnInit {

  @Input() labels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() data: number[] = [350, 450, 100];
  @Input() chartType: ChartType = 'doughnut';
  @Input() leyenda: string = 'Gráfico 1';

  constructor() { }

  ngOnInit() {
  }

}
