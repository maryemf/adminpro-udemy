import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { PagenotfoundComponent } from '../shared/pagenotfound/pagenotfound.component';
import { PAGES_ROUTES } from './pages.routes';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graph1Component,
        PagenotfoundComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES
    ],
    exports: [ // usados en otros componentes
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graph1Component,
        PagenotfoundComponent
    ],
    providers: [],
})
export class PagesModule {}
