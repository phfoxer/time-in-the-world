import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';
import { ISection } from 'src/app/interface/sections.interface';
import { environment } from 'src/environments/environment';
import { IArticle } from 'src/app/interface/article.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NewsService]
})
export class HomeComponent implements OnInit {
  news$: IArticle[] = [];
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    const sections: ISection[] = environment.sections;
    sections.forEach((section: ISection) => {
      this.newsService.getNews(section.sectionId, '5').subscribe(article =>
        article.map(r => this.news$.push(r))
      );
    });
  }
}
