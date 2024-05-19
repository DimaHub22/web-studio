import {Component, HostListener, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {PopularArticleTypes} from "../../../../types/popular-article.types";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../../types/category.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";
import {AppliedFiltersType} from "../../../../types/applied-filters.type";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  articles: PopularArticleTypes[] = []
  categories: CategoryType[] = []
  activeParams: ActiveParamsType = {categories: []}
  appliedFilters: AppliedFiltersType[] = []
  open: boolean = false
  pages: number[] = []

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {



    this.categoryService.getCategories()
      .subscribe((data: CategoryType[]) => {
        this.categories = data


        this.activatedRouter.queryParams
          .pipe(
            debounceTime(500)
          )
          .subscribe(params => {

            if(params['page']){
              this.activeParams.page = Number(params['page'])
            }


            if (params['categories']) {
              this.activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
              this.activeParams.categories.length > 0 ? this.open = true : this.open = false

              this.appliedFilters = []
              this.activeParams.categories.forEach(url => {

                const foundCategory = this.categories.find(category => category.url === url)

                if (foundCategory) {
                  this.appliedFilters.push({
                    name: foundCategory.name,
                    urlParam: foundCategory.url
                  })
                }

              });
            }

            this.articleService.getArticles(this.activeParams)
              .subscribe((data: { count: number, pages: number, items: PopularArticleTypes[]}) => {

                this.pages = []
                for (let i = 1; i <= data.pages; i++) {
                  this.pages.push(i)
                }

                this.articles = data.items

              })
          })
      })

  }



  toggle() {
    this.open = !this.open

  }

  updateFilterParam(url: string) {
    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingTypeInParams = this.activeParams.categories.find(item => item === url);
      if (existingTypeInParams) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== url)
      } else if (!existingTypeInParams) {
        this.activeParams.categories = [...this.activeParams.categories, url]
      }
    } else if (url) {
      this.activeParams.categories = [url]
    }

    this.activeParams.page = 1
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })

  }

  removeAppliedFilter(appliedFilter: AppliedFiltersType) {
    if (appliedFilter.urlParam) {
      this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam)
    }
    this.activeParams.page = 1
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })

  }

  openPage(page:number){
    this.activeParams.page = page
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })
  }

  openPrevPage(){

    if(this.activeParams.page && this.activeParams.page > 1){
      this.activeParams.page--
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      })
    }

  }

  openNextPage(){
    if(!this.activeParams.page){
      this.activeParams.page = 1
    }

    if(this.activeParams.page && this.activeParams.page < this.pages.length){
      this.activeParams.page++
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      })
    }
  }

  @HostListener('document:click', ['$event.target'])
  click(event: HTMLElement) {
    if (this.open && event.className.indexOf('blog-sorting') === -1) {
      this.open = false
    }
  }
}
