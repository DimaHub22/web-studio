import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PopularArticleTypes} from "../../../types/popular-article.types";
import {DefaultResponseType} from "../../../types/default-response.type";
import {RequestsType} from "../../../types/requests.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TopArticlesService {

  constructor(private http: HttpClient) {
  }


  getTopArticle(): Observable<PopularArticleTypes[]> {
    return this.http.get<PopularArticleTypes[]>(environment.api + 'articles/top')
  }

  userRequest(value:RequestsType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests',{
      name: value.name,
      phone: value.phone,
      service: value.service,
      type: value.type
    })
  }
}
