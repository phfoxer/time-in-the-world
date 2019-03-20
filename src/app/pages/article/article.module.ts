import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: ArticleComponent }];

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})

export class ArticleModule { }
