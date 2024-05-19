import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentsType} from "../../../types/comments.type";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";
import {ActionType} from "../../../types/action.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getComments(id: string, count:number): Observable<{ allCount: number, comments: CommentsType[] }> {
    return this.http.get<{ allCount: number, comments: CommentsType[] }>(environment.api + 'comments', {
      params: {
        offset: count,
        article: id,
      }
    })

  }

  addComment(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
        text, article
      })
  }

  applyAction(action: string, id: string):Observable<DefaultResponseType>{
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + id + '/apply-action',{
      action: action
    })

  }

  getAction( id: string):Observable<ActionType[] | DefaultResponseType>{
    return this.http.get<ActionType[] | DefaultResponseType>(environment.api + 'comments/' + id + '/actions')

  }

  getActions( id: string):Observable<ActionType[] | DefaultResponseType>{
    return this.http.get<ActionType[] | DefaultResponseType>(environment.api + 'comments/article-comment-actions',{
      params:{
        articleId: id
      }
    })

  }

}
