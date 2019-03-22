import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/service/news.service';
import { IArticle } from 'src/app/interface/article.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [NewsService]
})
export class ArticleComponent implements OnInit {
  article: IArticle = <IArticle>{};
  constructor(private newsService: NewsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.newsService.getNewsById(decodeURIComponent(params.id), params.origin).subscribe(result => {
        console.log(result);
        this.article = result;
      });
    });
  }
}
