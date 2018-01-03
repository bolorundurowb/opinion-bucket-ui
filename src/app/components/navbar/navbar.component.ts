import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {tick} from '@angular/core/testing';

declare var jQuery: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})

export class NavbarComponent implements OnInit {
  $: any;
  user = { username: '', password: '' };
  newUser = { username: '', password: '', email: '', passwordAgain: '' };
  isLoggedIn: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;

  constructor(
    private auth: AuthService) {
    this.$ = jQuery;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  openLoginModal(): void {
    this.$('#loginModal')
      .modal({
        closable: false
      })
      .modal('show');
  }

  openRegisterModal(): void {
    this.$('#registerModal')
      .modal({
        closable: false
      })
      .modal('show');
  }

  login(): void {
    this.isLoading = true;
    this.hasError = false;

    this.auth.login(this.user)
      .subscribe((res) => {
        this.isLoading = false;
        this.hasError = false;

        // persist login details
        this.auth.saveToken(res.token);
        this.auth.saveUser(res.user);

        // set logged in param
        this.isLoggedIn = true;

        // close the modal
        this.$('#loginModal').modal('hide');

        // clear the user binding modal
        this.user = { username: '', password: '' };
      }, (err) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = err.error.message || err.message;
      });
  }
}
