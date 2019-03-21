import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageModule } from '../page.module';
import { ArticleComponent } from './article.component';

const routes: Routes = [{ path: '', component: ArticleComponent }];
@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageModule,
  ]
})
export class ArticleModule { }
