import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from 'src/app/interface/article.interface';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent {
  @Input() article: IArticle;
}
