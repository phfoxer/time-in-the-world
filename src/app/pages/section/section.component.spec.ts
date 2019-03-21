import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionComponent } from './section.component';
import { NewsService } from 'src/app/service/news.service';
import { ArticleItemComponent } from 'src/app/component/article-item/article-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HelperClass } from 'src/app/helper/helper.class';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let service: NewsService;
  let articleItemComponent: ArticleItemComponent;
  let fixture: ComponentFixture<SectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [SectionComponent, ArticleItemComponent],
      providers: [HelperClass, ArticleItemComponent, SectionComponent]
    })
      .compileComponents();
    service = TestBed.get(NewsService);
    component = TestBed.get(SectionComponent);
    articleItemComponent = TestBed.get(ArticleItemComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The method ngOnInit is defined', () => {
    expect(component.ngOnInit).toBeDefined();
  });

  it('Articles is done', () => {
    expect(component.articles.length).toEqual(0);
  });

  it('The getNews service method exists', () => {
    expect(service.getNews).toBeDefined();
  });

  it('Verify if article app is ready', () => {
    expect(articleItemComponent).toBeTruthy();
  });


});
