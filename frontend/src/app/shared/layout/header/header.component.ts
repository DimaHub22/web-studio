import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/auth/user.service";
import {AuthService} from "../../../core/auth/auth.service";
import {UserInfoType} from "../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: string = ''
  isLogged: boolean = false

  constructor(private userService: UserService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.isLogged = this.authService.getIsLoggedIn()
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn
      this.getUser()
    })

    this.getUser()
  }

  getUser() {
    if(this.isLogged){
      this.userService.getUserInfo()
        .subscribe({
          next: (data: UserInfoType | DefaultResponseType) => {
            if ((data as DefaultResponseType).error !== undefined) {
              console.log((data as DefaultResponseType).message)
            }
            this.userInfo = (data as UserInfoType).name;
          }
        })
    }

  }
  // getUser() {
  //   const token = this.authService.getTokens()
  //   if (this.isLogged && token.accessToken) {
  //     this.userService.getUserInfo()
  //       .subscribe({
  //         next: (data: UserInfoType | DefaultResponseType) => {
  //           if ((data as DefaultResponseType).error !== undefined) {
  //             console.log((data as DefaultResponseType).message)
  //           }
  //           this.userInfo = (data as UserInfoType).name;
  //         }
  //       })
  //   }
  // }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }

  doLogout() {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/'])
  }
}
