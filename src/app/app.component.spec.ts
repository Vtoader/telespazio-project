import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EventLogComponent } from './modules/event-log/components/event-log/event-log.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EventLogComponent
      ],
      imports: [HttpClientTestingModule], 
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
