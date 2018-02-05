import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OpinionsService} from '../../services/opinions.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.scss'],
  providers: [OpinionsService, AuthService]
})
export class OpinionsComponent implements OnInit {
  // inputs
  @Input() topicId: string;
  @Input() showEntry: boolean;

  // outputs
  @Output() opinionEntryClosed = new EventEmitter<boolean>();

  // data models
  opinions: Array<any>;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;

  // opinion data
  title: string;
  content: string;
  isAddingOpinion: boolean;
  showNewOpinionTitleError: boolean;

  constructor(private opinionsService: OpinionsService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    // set the loading ui
    this.isLoading = true;

    this.opinionsService.getAllOpinions(this.topicId)
      .subscribe((res) => {
        // stop the loading ui
        this.isLoading = false;

        // bind the retrieved data
        this.opinions = res;
      }, (err) => {
        // stop the loading ui
        this.isLoading = false;

        // show error pane
        this.hasError = true;

        // display the error
        this.errorMessage = err.error.message || err.message;
      });
  }

  getDisplayTime(opinion: any): string {
    // set the opinion creation date as relative time
    if (opinion.date) {
      return moment(opinion.date, 'YYYY-MM-DDTHH:mm:ss.sssZ').fromNow();
    }
  }

  getDisplayName(opinion: any): string {
    // show the username or full name as determined
    if (opinion.showName) {
      return `${opinion.author.firstName} ${opinion.author.lastName}`;
    } else {
      return opinion.author.username;
    }
  }

  getProfilePhoto(opinion: any): string {
    // set the new profile photo
    if (opinion.author.profilePhoto) {
      return opinion.auth.profilePhoto
    } else if (opinion.author.gender === 'Female') {
      return './../../../assets/avatars/female.jpg';
    } else if (opinion.author.gender === 'Male') {
      return './../../../assets/avatars/male.jpg'
    } else {
      return './../../../assets/avatars/decline.jpg';
    }
  }

  goToProfile(authorId: string): void {
    this.router.navigate(['users', authorId]);
  }

  displayError(err: any): void {
    // show error pane
    this.hasError = true;

    // display the error
    this.errorMessage = err.error.message || err.message;
  }

  getCurrentUserPhoto(): string {
    const user = this.authService.retrieveUser();
    return this.getProfilePhoto({author: user});
  }

  closeNewOpinionEntry(): void {
    this.opinionEntryClosed.emit(false);
  }

  addOpinion(): void {
    // show loading
    this.isAddingOpinion = true;
    this.showNewOpinionTitleError = false;
    this.hasError = false;

    if (!this.title) {
      this.isAddingOpinion = false;
      this.showNewOpinionTitleError = true;
      return;
    }

    this.opinionsService.createOpinion(
      this.topicId,
      {
        title: this.title,
        content: this.content
      }
    )
      .subscribe((res) => {
        this.isAddingOpinion = false;
        this.opinionEntryClosed.emit(true);
      }, (err) => {
        this.hasError = true;
        this.errorMessage = err.error.message || err.message;
      });

    // after all
    this.title = '';
    this.content = '';
    this.opinionEntryClosed.emit(true);
  }
}
