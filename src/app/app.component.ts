import { Component, OnInit } from '@angular/core';
import { NewsService } from './service/news.service';
import { IArticle } from './interface/article.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NewsService]
})
export class AppComponent implements OnInit {
  title = 'twtop';
  constructor(private newsService: NewsService) {

  }

  ngOnInit() {
    this.newsService.getNews('science').then((result: IArticle[]) => {
     console.log(result);
    });
  }


}
