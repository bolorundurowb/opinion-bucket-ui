import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OpinionsService} from '../../services/opinions.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dislike',
  templateUrl: 'dislike.component.html',
  styleUrls: [],
  providers: [OpinionsService, AuthService]
})
export class DislikeComponent implements OnInit {
  // inputs
  @Input() topicId: string;
  @Input() opinionId: string;

  // outputs
  @Output() errors = new EventEmitter<any>();

  // variables
  userId: string;
  isLoading: boolean;

  // data models
  numOfDislikes: number;
  hasDisliked: boolean;
  isEnabled: boolean;

  constructor(private opinionsService: OpinionsService,
              private authService: AuthService) {
    this.isEnabled = true;
  }

  ngOnInit(): void {
    const user = this.authService.retrieveUser();

    // retrieve the opinion
    this.opinionsService.getOpinion(this.topicId, this.opinionId)
      .subscribe((res) => {
        // set number of likes
        this.numOfDislikes = res.dislikes.number;

        if (user) {
          this.userId = user._id;

          // check if the user has liked
          if (res.likes.users.indexOf(this.userId) > -1) {
            this.isEnabled = false;
          }

          // check if user has liked already
          if (res.dislikes.users.indexOf(this.userId) > -1) {
            this.hasDisliked = true;
          }
        }
      }, (err) => {
        // emit error
        this.errors.emit(err);
      });
  }

  dislike(): void {
    this.isLoading = true;

    this.opinionsService.dislikeOpinion(this.topicId, this.opinionId)
      .subscribe((res) => {
        // update the number of likes
        this.numOfDislikes = res.dislikes.number;

        // tell the control that the opinion has been disliked
        this.hasDisliked = true;

        // stop loading
        this.isLoading = false;
      }, (err) => {
        // stop loading
        this.isLoading = false;

        // emit error
        this.errors.emit(err);
      });
  }

  unDislike(): void {
    this.isLoading = true;

    this.opinionsService.unDislikeOpinion(this.topicId, this.opinionId)
      .subscribe((res) => {
        // update the number of dislikes
        this.numOfDislikes = res.dislikes.number;

        // tell the control that the opinion has been undisliked
        this.hasDisliked = false;

        // stop loading
        this.isLoading = false;
      }, (err) => {
        // stop loading
        this.isLoading = false;

        // emit error
        this.errors.emit(err);
      });
  }
}
