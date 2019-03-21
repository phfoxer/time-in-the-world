import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
    {
        path: '',
        loadChildren: './pages/home/home.module#HomeModule'
    },
    {
        path: 'section/:section',
        loadChildren: './pages/section/section.module#SectionModule'
    },
    {
        path: ':section/:year/:month/:day/:title',
        loadChildren: './pages/article/article.module#ArticleModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routedComponents = [
   // NotFoundComponent
];
