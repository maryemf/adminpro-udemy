import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { PagenotfoundComponent } from '../shared/pagenotfound/pagenotfound.component';
import { PAGES_ROUTES } from './pages.routes';
import { IncreaserComponent } from '../components/increaser/increaser.component';
import { GraphDoughnutComponent } from '../components/graph-doughnut/graph-doughnut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graph1Component,
        PagenotfoundComponent,
        IncreaserComponent,
        GraphDoughnutComponent,
        AccountSettingsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ChartsModule,
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
