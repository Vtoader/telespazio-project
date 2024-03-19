import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLogComponent } from './components/event-log/event-log.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FormatDatePipe } from './pipes/date-format.pipe';
import { MatTooltipModule } from '@angular/material/tooltip'

@NgModule({
    declarations: [
        EventLogComponent,
        FormatDatePipe
    ],
    imports: [
        CommonModule,
        CanvasJSAngularChartsModule,
        MatTableModule,
        MatTooltipModule,
        HttpClientModule
    ], exports: [EventLogComponent]
})
export class EventLogModule { }