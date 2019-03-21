import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('The THE NY Times API keys exists', () => {
    expect(environment.keys.newyorktimes.length).toBeGreaterThan(1);
  });

  it('The THE Guardian API keys exists', () => {
    expect(environment.keys.theguardian.length).toBeGreaterThan(1);
  });

  it('Sections should exists', () => {
    expect(environment.sections.length).toBeGreaterThan(1);
  });

});
