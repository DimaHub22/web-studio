import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogsComponent } from './blogs/blogs.component';
import { ArticleComponent } from './article/article.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BlogsComponent,
    ArticleComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        BlogRoutingModule,
        ReactiveFormsModule
    ]
})
export class BlogModule { }
