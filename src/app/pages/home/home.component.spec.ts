import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { ArticleItemComponent } from 'src/app/component/article-item/article-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HelperClass } from 'src/app/helper/helper.class';
import { NewsService } from 'src/app/service/news.service';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let service: NewsService;
  let articleItemComponent: ArticleItemComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [HomeComponent, ArticleItemComponent],
      providers: [HelperClass, ArticleItemComponent, HomeComponent]
    })
      .compileComponents();
    service = TestBed.get(NewsService);
    component = TestBed.get(HomeComponent);
    articleItemComponent = TestBed.get(ArticleItemComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
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
