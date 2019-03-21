import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';
import { IArticle } from 'src/app/interface/article.interface';
import { ActivatedRoute } from '@angular/router';
import { HelperClass } from 'src/app/helper/helper.class';
import { ISection } from 'src/app/interface/sections.interface';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  providers: [NewsService, HelperClass]
})
export class SectionComponent implements OnInit {
  articles: IArticle[] = [];
  section: ISection;
  constructor(private newsService: NewsService, private route: ActivatedRoute, private helper: HelperClass) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.section = this.helper.getSectionById(params['section']);
      this.newsService.getNews(params['section']).subscribe((articles: IArticle[]) => {
        this.articles = articles;
      });
    });
  }
}
