import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NewsService } from './news.service';
import { IArticle } from '../interface/article.interface';


describe('NewsService', () => {

  let service: NewsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });
    service = TestBed.get(NewsService);
  });


  it('Get articles by NY Times', () => {

    const dummyPost: IArticle[] = [{
      title: 'The world peaca is a reallity',
      text: 'All nations of the presidents...',
      date: new Date(),
      section: 'world'
    }];

    service.getTheNewYorkTimes('science').subscribe((result: any) => {
      expect('1').toEqual('2');
    });
    // https://www.youtube.com/watch?v=4JVnSkR04tM
  });


});
