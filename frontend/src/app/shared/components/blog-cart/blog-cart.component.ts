import {Component, Input, OnInit} from '@angular/core';
import {PopularArticleTypes} from "../../../../types/popular-article.types";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-blog-cart',
  templateUrl: './blog-cart.component.html',
  styleUrls: ['./blog-cart.component.scss']
})
export class BlogCartComponent implements OnInit {

  @Input() article!: PopularArticleTypes


  path:string = environment.path
  constructor() { }

  ngOnInit(): void {

  }

}
