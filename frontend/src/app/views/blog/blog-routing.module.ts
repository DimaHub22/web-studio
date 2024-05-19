import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogsComponent} from "./blogs/blogs.component";
import {ArticleComponent} from "./article/article.component";

const routes: Routes = [
  {path:'blog', component: BlogsComponent},
  {path:'article', component:ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
