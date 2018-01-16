import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

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

  // for the drop down
  avatarUrl: string;
  displayName: string;

  constructor(
    private auth: AuthService) {
    this.$ = jQuery;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    if (this.isLoggedIn) {
      const human = this.auth.retrieveUser();

      // avatar
      this.avatarUrl = human.profilePhoto;
      if (!this.avatarUrl) {
        if (human.gender === 'Decline') {
          this.avatarUrl = './../../../assets/avatars/decline.jpg';
        } else if (human.gender === 'Female') {
          this.avatarUrl = './../../../assets/avatars/female.jpg';
        } else if (human.gender === 'Male') {
          this.avatarUrl = './../../../assets/avatars/male.jpg';
        }
      }

      // display name
      if (human.firstName && human.lastName) {
        this.displayName = `${human.firstName} ${human.lastName}`;
      } else {
        this.displayName = human.username;
      }
    }
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

        // show the dropdown
        this.$('#dropdown').show();

        // clear the user binding modal
        this.user = { username: '', password: '' };
      }, (err) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = err.error.message || err.message;
      });
  }

  register(): void {
    this.isLoading = true;
    this.hasError = false;

    this.auth.register(this.newUser)
      .subscribe((res) => {
        this.isLoading = false;
        this.hasError = false;

        // persist login details
        this.auth.saveToken(res.token);
        this.auth.saveUser(res.user);

        // set logged in param
        this.isLoggedIn = true;

        // close the modal
        this.$('#registerModal').modal('hide');

        // clear the user binding modal
        this.newUser = { username: '', password: '', email: '', passwordAgain: '' };
      }, (err) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = err.error.message || err.message;
      })
  }

  logOut(): void {
    // show the login controls
    this.isLoggedIn = false;

    // clear saved user data
    this.auth.clearData();
  }
}
