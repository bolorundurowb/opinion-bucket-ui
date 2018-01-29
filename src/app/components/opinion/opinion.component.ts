import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: []
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

  constructor() {
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

    // set a neutral profile photo until one is loaded
    this.displayPhoto = './../../../assets/avatars/decline.jpg';
  }

  ngOnInit(): void {

  }

  propagateError(err: any): void {
    this.errors.emit(err);
  }
}
