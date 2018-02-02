import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: [],
  providers: [UsersService]
})
export class OpinionComponent implements OnInit {
  // inputs
  @Input() opinion: any;

  // outputs
  @Output() errors = new EventEmitter<any>();

  // data models
  author: any;
  creationTime: string;
  displayName: string;
  displayPhoto: string;

  constructor(private usersService: UsersService,
              private router: Router) {
    // set a neutral profile photo until one is loaded
    this.displayPhoto = './../../../assets/avatars/decline.jpg';
  }

  ngOnInit(): void {
    // set the opinion creation date as relative time
    if (this.opinion.date) {
      this.creationTime = moment(this.opinion.date, 'YYYY-MM-DDTHH:mm:ss.sssZ').fromNow();
    }

    // show the username or full name as determined
    if (this.opinion.showName) {
      this.displayName = `${this.opinion.firstName} ${this.opinion.lastName}`;
    } else {
      this.displayName = this.opinion.username;
    }

    this.usersService.retrieveUserById(this.opinion.author)
      .subscribe((res) => {
        this.author = res;

        // set the new profile photo
        if (res.profilePhoto) {
          this.displayPhoto = res.profilePhoto;
        } else if (res.gender === 'Female') {
          this.displayPhoto = './../../../assets/avatars/female.jpg';
        } else if (res.gender === 'Male') {
          this.displayPhoto = './../../../assets/avatars/male.jpg'
        }
      }, (err) => {
        this.propagateError(err);
      });
  }

  propagateError(err: any): void {
    this.errors.emit(err);
  }

  goToProfile(): void {
    this.router.navigate(['users', this.opinion.author]);
  }
}
