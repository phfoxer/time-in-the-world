import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticleComponent } from './article.component';
import { HelperClass } from 'src/app/helper/helper.class';

describe('SectionComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ArticleComponent],
      providers: [ArticleComponent, HelperClass]
    })
      .compileComponents();
    component = TestBed.get(ArticleComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The method ngOnInit is defined', () => {
    expect(component.ngOnInit).toBeDefined();
  });

});
