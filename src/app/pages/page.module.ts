import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleItemComponent } from '../component/article-item/article-item.component';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [
        ArticleItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [ArticleItemComponent],
    providers: [],
    bootstrap: []
})
export class PageModule { }
