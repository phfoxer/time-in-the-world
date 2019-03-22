import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news.service';
import { environment } from 'src/environments/environment';
import { HelperClass } from '../helper/helper.class';

describe('NewsService', () => {

  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService, HelperClass]
    });
    service = TestBed.get(NewsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Get articles by NY Times Science section.', () => {
    const section = 'science';
    service.getListTheNewYorkTimes(section).subscribe(() => { });
    // Test query string
    const query = '?api-key=' + environment.keys.newyorktimes + '&limit=10';
    const request = httpMock.expectOne(service.newyorktimesapis + 'content/nyt/' + section + '.json' + query);
    // Test request type
    expect(request.request.method).toBe('GET');
  });

  it('Get articles by NY Times World section.', () => {
    const section = 'world';
    service.getListTheNewYorkTimes(section).subscribe(() => { });
    // Test query string
    const query = '?api-key=' + environment.keys.newyorktimes + '&limit=10';
    const request = httpMock.expectOne(service.newyorktimesapis + 'content/nyt/' + section + '.json' + query);
    // Test request type
    expect(request.request.method).toBe('GET');
  });


  it('Get articles by The Guardian Science section.', () => {
    const section = 'science';
    service.getListTheGuardian(section).subscribe(() => { });
    // Test query string
    const query = '?api-key=' + environment.keys.theguardian + '&show-fields=trail-text,byline,body,thumbnail&page-size=10';
    const request = httpMock.expectOne(service.theguardianapis + section + query);
    // Test request type
    expect(request.request.method).toBe('GET');
  });

  it('Get articles by The Guardian World section.', () => {
    const section = 'world';
    service.getListTheGuardian(section).subscribe(() => { });
    // Test query string
    const query = '?api-key=' + environment.keys.theguardian + '&show-fields=trail-text,byline,body,thumbnail&page-size=10';
    const request = httpMock.expectOne(service.theguardianapis + section + query);
    // Test request type
    expect(request.request.method).toBe('GET');
  });


});
