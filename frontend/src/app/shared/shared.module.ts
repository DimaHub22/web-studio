import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCartComponent } from './components/blog-cart/blog-cart.component';
import {RouterModule} from "@angular/router";
import { ModalComponent } from './components/modal/modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AgreementComponent } from './layout/agreement/agreement.component';
import {NgxMaskModule} from "ngx-mask";



@NgModule({
  declarations: [
    BlogCartComponent,
    ModalComponent,
    AgreementComponent,

  ],
  exports: [
    BlogCartComponent,
    BlogCartComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgxMaskModule
    ]
})
export class SharedModule { }
