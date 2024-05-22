import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";
import {PopularArticleTypes} from "../../../../types/popular-article.types";
import {CommentService} from "../../../shared/services/comment.service";
import {CommentsType} from "../../../../types/comments.type";
import {AuthService} from "../../../core/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ActionType} from "../../../../types/action.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: ArticleType
  popularArticles: PopularArticleTypes[] = []
  path: string = environment.path

  comments: CommentsType[] = []
  isLogged: boolean = false
  accessToken: string | null = null

  commentAction: ActionType[] = [{comment: '', action: ''}]
  commentActions: ActionType[] = []

  commentMore: boolean = false
  commentTextarea = this.fb.group({
    text: ['', [Validators.required]]
  })

  count: number = 3
  loader: boolean = false

  constructor(private articleService: ArticleService,
              private activatedRouter: ActivatedRoute,
              private commentService: CommentService,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.isLogged = this.authService.getIsLoggedIn()

    this.article = {
      text: '',
      comments: [],
      commentsCount: 0,
      id: '',
      title: '',
      description: '',
      image: '',
      date: '',
      category: '',
      url: ''
    }
  }

  ngOnInit(): void {


    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn
    })


    this.activatedRouter.queryParams
      .subscribe(data => {

        this.getArticle(data['article'])

        this.getRelated(data['article'])
      })

  }

  getArticle(article: string) {
    this.articleService.getArticle(article)
      .subscribe(data => {
        this.article = data
        this.commentMore = (this.article.commentsCount <= 3)

        this.getAction(data.id)

      })
  }

  getAction(id: string) {
    if (this.isLogged) {
      this.commentService.getActions(id)
        .subscribe((applyComments: ActionType[] | DefaultResponseType) => {

          this.commentActions = applyComments as ActionType[]

          this.article.comments.map(item => {
            this.commentActions.forEach(el => {
              if (item.id === el.comment) {
                item.action = el.action
              }
            })
          })
        })
    }
  }

  getRelated(url: string) {
    this.articleService.getRelated(url)
      .subscribe((data: PopularArticleTypes[]) => {
        this.popularArticles = data
      })
  }

  getComments(id: string) {
    this.loader = true
    if (id) {
      this.commentService.getComments(id, this.count)
        .subscribe((data: { allCount: number, comments: CommentsType[] }) => {

          this.comments = data.comments
          this.count = this.comments.length >= 10 ? this.count + 10 : 3


          data.comments.forEach(item => {
            this.article.comments = [...this.article.comments, item]
          })

          this.commentMore = (data.allCount === this.article.comments.length)
          this.loader = false
          this.getAction(this.article.id)

        })
    }

  }

  sendComment() {
    if (this.commentTextarea.value.text && this.article?.id) {
      this.commentService.addComment(this.commentTextarea.value.text, this.article?.id)
        .subscribe((data: DefaultResponseType) => {

          if (!data.error) {
            this._snackBar.open(data.message)

            this.getArticle(this.article.url)

            this.getComments(this.article.id)
            this.commentTextarea.reset()
          }

        })

    }

  }

  applyAction(action: string, id: string) {
    if (this.isLogged) {


      this.commentService.applyAction(action, id)
        .subscribe({
          next: (data: DefaultResponseType) => {


            if (action === 'violate') {
              this._snackBar.open('Жалоба отправлена')
            } else {
              this._snackBar.open('Ваш голос учтен')
            }

            ///////////////////

            this.commentService.getAction(id)
              .subscribe(data => {
                const actions = data as ActionType[]

                let actionId = ''

                this.article.comments.forEach(el => {

                  const action = actions.find(item => item.comment === el.id)

                  actionId = action ? action.comment : '';
                  el.action = action ? action.action : '';


                  this.articleService.getArticle(this.article.url)
                    .subscribe(data => {


                    })

                })

              })

            /////////////////////////

            // this.getArticle(this.article.url)
          },
          error: (error: HttpErrorResponse) => {
            this._snackBar.open('Жалоба уже отправлена')
          }
        })
    }
  }
}
