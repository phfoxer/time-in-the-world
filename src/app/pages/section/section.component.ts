import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';
import { IArticle } from 'src/app/interface/article.interface';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  providers: [NewsService]
})
export class SectionComponent implements OnInit {
  allNews: IArticle[];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }

  setSection(section: string) {
    this.newsService.getNews(section).subscribe((articles: IArticle[]) => {
      this.allNews = articles;
    });
  }
}
