import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PopularArticleTypes} from "../../../types/popular-article.types";
import {ActiveParamsType} from "../../../types/active-params.type";
import {ArticleType} from "../../../types/article.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }


  getArticles(params:ActiveParamsType): Observable<{count:number, pages:number, items:PopularArticleTypes[]} > {
    return this.http.get<{count:number, pages:number, items:PopularArticleTypes[]}>(environment.api + 'articles',{
      params: params
    })
  }

  getArticle(params:string): Observable<ArticleType> {
    return this.http.get<ArticleType>(environment.api + 'articles/' + params)
  }

  getRelated(url:string):Observable<PopularArticleTypes[]>{
    return this.http.get<PopularArticleTypes[]>(environment.api + 'articles/related/' + url)
  }
}
