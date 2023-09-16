import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalComponent, ModalData } from '../shared/modal/modal.component';
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {
  error: string = '';
  private userSub: Subscription = new Subscription;
  logedin = false;

  constructor(private authService: AuthService, private router: Router, private modalComponent: ModalComponent) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.logedin = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
}

  onLogin(e: ModalData) {
    if (e) {
      if (e.functionality === 'login') {
        this.loginUser(e.data);
      }
    }
  }

  onRegister(e: ModalData) {
    if (e) {
      if (e.functionality === 'register') {
        this.registerUser(e.data);
      }
    }
  }

  onLogout() {
    this.logedin = false;
    this.authService.logout();
  }

  loginUser(data: ModalData["data"]) {
    this.authService.login({ userName: data[0].value, password: data[1].value, token:'' })
    .subscribe(
      {
          next: (resData) => {
              //console.log(resData);
              this.logedin = true;
              this.router.navigate(['/']);
          },
          error: (errorMessage) => {
              console.log(errorMessage);
              this.error = errorMessage;
              this.logedin = false;
              this.modalComponent.showErrorAlert(errorMessage);
          }
      }
     );
  }

  registerUser(data: ModalData["data"]) {
    this.authService.register({userName: data[0].value, password: data[1].value, email: data[2].value, token:''})
    .subscribe(
        {
            next: (resData) => {
                //console.log(resData);
                this.router.navigate(['/menu']);
            },
            error: (errorMessage) => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.modalComponent.showErrorAlert(errorMessage);
            }
        }
        );
  }
}
