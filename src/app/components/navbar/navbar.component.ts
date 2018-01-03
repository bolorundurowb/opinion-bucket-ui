import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

declare var jQuery: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})

export class NavbarComponent {
  $: any;
  user = { username: '', password: '' };
  isLoggedIn: boolean;
  isLoading: boolean;
  errorMessage: string;

  constructor(
    private auth: AuthService) {
    this.$ = jQuery;
  }

  openLoginModal(): void {
    this.$('#loginModal')
      .modal({
        closable: false
      })
      .modal('show');
  }

  login(): void {
    this.isLoading = true;

    this.auth.login(this.user)
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }
}
