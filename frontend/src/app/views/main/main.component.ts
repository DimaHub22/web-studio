import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {TopArticlesService} from "../../shared/services/top-articles.service";
import {PopularArticleTypes} from "../../../types/popular-article.types";
import {MatDialog} from "@angular/material/dialog";
import {NonNullableFormBuilder} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ModalComponent} from "../../shared/components/modal/modal.component";
import {ServicesType} from "../../../types/services.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  customOptionsReview: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    margin: 24,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 3
      }
    },
    nav: false
  }
  popularArticles: PopularArticleTypes[] = [];


  constructor(private popularService: TopArticlesService,
              private dialog: MatDialog,
              private fb: NonNullableFormBuilder,
              private _snackBar: MatSnackBar) {

  }

  services = [
    {
      image: 'service1.png',
      title: 'Создание сайтов',
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 'От 7 500₽'
    },
    {
      image: 'service2.png',
      title: 'Продвижение',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: 'От 3 500₽'
    },
    {
      image: 'service3.png',
      title: 'Реклама',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 'От 1 000₽'
    },
    {
      image: 'service4.png',
      title: 'Копирайтинг',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: 'От 750₽'
    },
  ]

  advantages = [
    {
      title: 'Мастерски вовлекаем аудиториюв процесс.',
      text: 'Мы увеличиваем процент вовлечённости за короткий промежуток времени.',
    },
    {
      title: 'Разрабатываем бомбическую визуальную концепцию.',
      text: 'Наши специалисты знают как создать уникальный образ вашего проекта.',
    },
    {
      title: 'Создаём мощные воронки с помощью текстов.',
      text: 'Наши копирайтеры создают не только вкусные текста, но и классные воронки.',
    },
    {
      title: 'Помогаем продавать больше.',
      text: 'Мы не только помогаем разработать стратегию по продажам, но также корректируем её под нужды заказчика.',
    },
  ]

  reviews = [
    {
      image: 'user1.jpeg',
      name: 'Станислав',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      image: 'user2.jpeg',
      name: 'Алёна',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      image: 'user3.jpeg',
      name: 'Мария',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    }
  ]


  ngOnInit(): void {

    this.popularService.getTopArticle()
      .subscribe((data: PopularArticleTypes[]) => {
        this.popularArticles = data
      })
  }

  openDialog(value: string, request: boolean) {
    let service:ServicesType [] = []
    if(request){
      service = this.services
    }

    this.dialog.open(ModalComponent, {
      data: {service: service, value: value, consultation: false}
    })

  }

}
