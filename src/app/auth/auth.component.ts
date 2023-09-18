import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalComponent, ModalData } from '../shared/modal/modal.component';
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {

  private userSub: Subscription = new Subscription;
  private errorSub: Subscription = new Subscription;
  logedin = false;
  _error: string = '';
  
  modalRef!: NgbModalRef;
  @Input() user: string = '';
  @Output() loggedin = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();
  @Output() message = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router, private modal: NgbModal) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.user = user.userName;
      }
      this.logedin = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogin() {
    this.modalRef = this.modal.open(ModalComponent);
    this.modalRef.componentInstance.functionality = 'login';
    this.modalRef.componentInstance.inputs = ['username', 'password'];
    this.modalRef.componentInstance.parentRef = this;
    this.modalRef.componentInstance.onSubmitData.subscribe((e: ModalData) => {
      this.onSubmitData(e)
    })
  }

  onRegister() {
    this.modalRef = this.modal.open(ModalComponent);
    this.modalRef.componentInstance.functionality = 'register';
    this.modalRef.componentInstance.inputs = ['username', 'password', 'email'];
    this.modalRef.componentInstance.parentRef = this;
    this.modalRef.componentInstance.onSubmitData.subscribe((e: ModalData) => {
      this.onSubmitData(e)
    })
  }

  onSubmitData(e: ModalData) {
    if (e) {
      if (e.functionality === 'login') {
        this.loginUser(e.data);
      }

      if (e.functionality === 'register') {
        this.registerUser(e.data);
      }
    }
  }

  onLogout() {
    this.authService.logout();
  }

  loginUser(data: ModalData["data"]) {
    this.authService.login({ userName: data[0].value, password: data[1].value, token:'' })
    .subscribe(
      {
          next: (resData) => {
              this.loggedin.emit(this.logedin);
              this.message.emit('Successfuly logged in.');
              this.authService.error.subscribe(error => {
                  this.error.emit(error);
              });
              this.router.navigate(['/']);
          },
          error: (errorMessage) => {
              this.loggedin.emit(this.logedin);
              this.message.emit('Fail to log in.');
              this.authService.error.subscribe(error => {
                this.error.emit(error);
            });
          }
      }
     );
  }

  registerUser(data: ModalData["data"]) {
    this.authService.register({userName: data[0].value, password: data[1].value, email: data[2].value, token:''})
    .subscribe(
        {
            next: (resData) => {
              this.loggedin.emit(this.logedin);
              this.message.emit('Successfuly registered.');
              this.authService.error.subscribe(error => {
                this.error.emit(error);
            });
                this.router.navigate(['/menu']);
            },
            error: (errorMessage) => {
              this.loggedin.emit(this.logedin);
              this.message.emit('Fail to register.');
              this.authService.error.subscribe(error => {
                this.error.emit(error);
            });
            }
        }
        );
  }
}
