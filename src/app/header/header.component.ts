import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedin = false;

  constructor(private authSerive: AuthService) { }

  ngOnInit() {
    this.authSerive.user.subscribe(user => {
      this.loggedin = !!user;
    })
  }
}
