import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLogComponent } from './event-log.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { EventLogService } from '../../services/event-log.service';
import { of } from 'rxjs';
import { ElementRef } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

describe('EventLogComponent', () => {
  let component: EventLogComponent;
  let fixture: ComponentFixture<EventLogComponent>;

  let mockEventLogService;
  const mockEvent = {
    "timestamp": "2021-08-01T12:00:00.000Z",
    "level": "WARNING",
    "message": "Metric 1 is above the warning threshold"
  }



  beforeEach(async () => {
    mockEventLogService = jasmine.createSpyObj(['getEventLogs']);
    mockEventLogService.getEventLogs.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [EventLogComponent],
      imports: [HttpClientTestingModule, MatTableModule, CanvasJSAngularChartsModule],
      providers: [{ provide: EventLogService, useValue: mockEventLogService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EventLogComponent);
    component = fixture.componentInstance;

    component.table = new ElementRef({ querySelectorAll: () => { } });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get chart instance', () => {
    component.getChartInstance("asd");
    expect(component.chart).toEqual("asd");
  });

  it('should handle mouse over', () => {
    component.chartOptions = {
      data: [{
        dataPoints: [{
          markerBorderThickness: "2"
        }]
      }]
    }
    fixture.detectChanges();
    component.handleMouseOver(0);
    expect(component.chartOptions.data[0].dataPoints[0].markerBorderThickness).toEqual("5");
  });

  it('should handle mouse leave', () => {
    component.chartOptions = {
      data: [{
        dataPoints: [{
          markerBorderThickness: "5"
        }]
      }]
    }
    fixture.detectChanges();
    component.handleMouseLeave(0);
    expect(component.chartOptions.data[0].dataPoints[0].markerBorderThickness).toEqual("2");
  });

  it('should set marker color', () => {
    expect(component.setMarkerColor('WARNING')).toEqual('orange');
    expect(component.setMarkerColor('ERROR')).toEqual('red');
    expect(component.setMarkerColor('INFO')).toEqual('white');
    expect(component.setMarkerColor('test')).toEqual('white');
  });

  it('should set minimum limit', () => {
    expect(component.setMinimumLimit(mockEvent)).toEqual(new Date("2021-08-01 11:30:00"));
  });

  it('should set maximum limit', () => {
    expect(component.setMaximumLimit(mockEvent)).toEqual(new Date("2021-08-01 12:30:00"));
  });

  it('should filter table values', () => {
    const mockFilterEvent = {
      axisX: [{ viewportMinimum: 1627815281188.848, viewportMaximum: 1627824531635.981 }],
      trigger: 'reset'
    }
    component.filterTableValues(mockFilterEvent)
    expect(component.fromDate).toEqual(1627815281188.848);
    expect(component.toDate).toEqual(1627824531635.981);
  });







});
