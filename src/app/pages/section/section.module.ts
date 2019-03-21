import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section.component';
import { RouterModule, Routes } from '@angular/router';
import { PageModule } from '../page.module';

const routes: Routes = [{ path: '', component: SectionComponent }];

@NgModule({
  declarations: [SectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageModule,
  ]
})
export class SectionModule { }
