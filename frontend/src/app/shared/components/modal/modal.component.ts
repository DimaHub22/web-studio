import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {RequestsType} from "../../../../types/requests.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {TopArticlesService} from "../../services/top-articles.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ServicesType} from "../../../../types/services.type";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{

  success: boolean = false
  type: string = 'consultation'
  services: ServicesType[] = []

  formPopup = this.fb.group({
    title: [''],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]]
    // phone: ['', [Validators.required, Validators.pattern(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/)]]
  })
  constructor(private fb: NonNullableFormBuilder,
              private dialog: MatDialog,
               private popularService: TopArticlesService,
               private _snackBar: MatSnackBar,
               @Inject(MAT_DIALOG_DATA) public data: {service?: ServicesType[],value?: string, consultation:boolean }) { }

  ngOnInit(): void {
    if(this.data.service && this.data.value){
      this.services = this.data.service
      this.formPopup.get('title')?.setValue(this.data.value)
      this.type = 'order'
    }

  }

  // errorForm() {
  //   //Валидация разобраться
  //   if (this.formPopup.get('name')?.value && this.formPopup.get('name')?.errors) {
  //     this._snackBar.open('Введите тоько буквы')
  //
  //   } else if (this.formPopup.get('phone')?.value && this.formPopup.get('phone')?.errors) {
  //
  //     const error = this.formPopup.get('phone')?.errors
  //
  //     if (error) {
  //       this._snackBar.open('Введите тоько цифры')
  //       if (error['pattern']['actualValue'].length > 11) {
  //         this._snackBar.open("Введите 11 символов. Сейчас " + error['pattern']['actualValue'].length + " символов")
  //       }
  //     }
  //
  //   }
  // }
  sendForm() {

    let userRequest: RequestsType = {
      name: this.formPopup.get('name')?.value,
      phone: this.formPopup.get('phone')?.value,
      type: this.type
    }

    if (!this.data.consultation) {
      userRequest.service = this.formPopup.get('title')?.value
    }


    this.popularService.userRequest(userRequest)
      .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message)
            }

            this._snackBar.open(data.message)
            this.success = true
          },

          error: error => this._snackBar.open('Произошла ошибка при отправке формы, попробуйте еще раз')
        }
      )
  };
  closePopup() {
    this.dialog.closeAll()
    this.formPopup.reset()
  }
}
