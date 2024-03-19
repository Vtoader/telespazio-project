import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventLogService } from '../../services/event-log.service';
import { MatTableDataSource } from '@angular/material/table';
import { Event } from '../../model/events.model';

@Component({
  selector: 'app-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.css']
})
export class EventLogComponent implements OnInit {
  @ViewChild('table') table: ElementRef;

  eventLogs: Event[];
  eventLogsTable: MatTableDataSource<Event>;
  displayedColumns: string[] = ['timestamp', 'level', 'message'];
  chartOptions;
  fromDate: number;
  toDate: number;
  elements;
  chart;
  isElementsLoaded = false;

  constructor(private eventLogService: EventLogService) { }

  ngOnInit() {
    this.getEventLogs();
  }

  getEventLogs() {
    this.eventLogService.getEventLogs().subscribe(res => {
      this.eventLogs = res.map((elem, i) => {
        return { ...elem, index: i }
      })
      this.eventLogsTable = new MatTableDataSource(this.eventLogs);
      this.eventLogsTable.filterPredicate = (data) => {
        if (this.fromDate && this.toDate) {
          return new Date(data.timestamp.substring(0, 19)).getTime() >= this.fromDate && new Date(data.timestamp.substring(0, 19)).getTime() <= this.toDate;
        }
        return true;
      }
      this.setChartOptions()
    })
  }


  hideLoader(): void {
    if (!this.isElementsLoaded) {
      this.elements = this.table.nativeElement.querySelectorAll('.cdk-row');
      this.isElementsLoaded = true;
    }
  }


  getChartInstance(chart): void {
    this.chart = chart
  }


  handleMouseOver(index): void {
    this.chartOptions.data[0].dataPoints[index].markerBorderThickness = '5';
    this.chart.render()
  }

  handleMouseLeave(index): void {
    this.chartOptions.data[0].dataPoints[index].markerBorderThickness = '2';
    this.chart.render()
  }

  setChartOptions(): void {
    this.chartOptions = {
      rangeChanging: (e) => {
        this.filterTableValues(e)
      },
      title: {
        text: "Event log"
      },
      animationEnabled: true,
      zoomEnabled: true, xValueType: "dateTime",
      axisY: {
        title: "",
        tickLength: 0,
        lineThickness: 0,
        labelFormatter: function () {
          return "";
        },
        gridThickness: 1,
        includeZero: false,
        viewportMinimum: -50,
        viewportMaximum: 50,
        interval: 100
      },
      axisX: {
        viewportMinimum: this.setMinimumLimit(this.eventLogs[0]),
        viewportMaximum: this.setMaximumLimit(this.eventLogs[this.eventLogs.length - 1]),
      },
      data: [{
        type: "line",
        color: "black",
        markerBorderColor: "black",
        markerSize: 20,
        markerColor: "red",
        markerBorderThickness: 2,
        highlightEnabled: false,
        toolTipContent: null,
        dataPoints: this.setDataPoints()
      }]
    };
  }

  setDataPoints() {
    return this.eventLogs.map(elem => {
      return {
        ...elem,
        x: new Date(elem.timestamp.substring(0, 19)),
        y: 0,
        markerColor: this.setMarkerColor(elem.level),
        mouseover: (e) => this.eventFocused(e),
        mouseout: (e) => this.eventUnfocused(e),
      }
    })
  }


  eventFocused(event): void {
    this.elements[event.dataPoint.index].classList.add("focused-event");
  }

  eventUnfocused(event): void {
    this.elements[event.dataPoint.index].classList.remove("focused-event");
  }

  setMarkerColor(level: string): string {
    switch (level) {
      case 'WARNING':
        return 'orange'
      case 'ERROR':
        return 'red'
      case 'INFO':
        return 'white'
      default:
        return 'white'
    }
  }

  setMinimumLimit(event: Event): Date {
    const eventDate = new Date(event.timestamp.substring(0, 19));
    eventDate.setTime(eventDate.getTime() - (30 * 60 * 1000));
    return eventDate;
  }

  setMaximumLimit(event: Event): Date {
    const eventDate = new Date(event.timestamp.substring(0, 19));
    eventDate.setTime(eventDate.getTime() + (30 * 60 * 1000));
    return eventDate;
  }

  filterTableValues(e): void {
    this.fromDate = e.axisX[0].viewportMinimum;
    this.toDate = e.axisX[0].viewportMaximum;
    this.eventLogsTable.filter = '' + Math.random();
    if (e.trigger === 'reset') {
      this.elements = this.table.nativeElement.querySelectorAll('.cdk-row');
    }
  }

}
