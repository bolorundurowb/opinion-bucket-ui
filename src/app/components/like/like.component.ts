import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OpinionsService} from '../../services/opinions.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-like',
  templateUrl: 'like.component.html',
  styleUrls: [],
  providers: [OpinionsService, AuthService]
})
export class LikeComponent implements OnInit {
  // inputs
  @Input() topicId: string;
  @Input() opinionId: string;

  // outputs
  @Output() errors = new EventEmitter<any>();

  // variables
  userId: string;
  isLoading: boolean;

  // data models
  numOfLikes: number;
  hasLiked: boolean;
  isEnabled: boolean;

  constructor(
    private opinionsService: OpinionsService,
    private authService: AuthService
  ) {
    this.isEnabled = true;
  }

  ngOnInit(): void {
    const user = this.authService.retrieveUser();

    if (user) {
      this.userId = user._id;

      // retrieve the opinion
      this.opinionsService.getOpinion(this.topicId, this.opinionId)
        .subscribe((res) => {
          // set number of likes
          this.numOfLikes = res.likes.number;

          // check if the user has disliked
          if (res.dislikes.users.indexOf(this.userId) > -1) {
            this.isEnabled = false;
          }

          // check if user has liked already
          if (res.likes.users.indexOf(this.userId) > -1) {
            this.hasLiked = true;
          }
        }, (err) => {
          // emit error
          this.errors.emit(err);
        });
    }
  }

  like(): void {
    this.isLoading = true;

    this.opinionsService.likeOpinion(this.topicId, this.opinionId)
      .subscribe((res) => {
        // update the number of likes
        this.numOfLikes = res.likes.number;

        // tell the control that the opinion has been liked
        this.hasLiked = true;

        // stop loading
        this.isLoading = false;
      }, (err) => {
        // stop loading
        this.isLoading = false;

        // emit error
        this.errors.emit(err);
      });
  }

  unlike(): void {
    this.isLoading = true;

    this.opinionsService.unlikeOpinion(this.topicId, this.opinionId)
      .subscribe((res) => {
        // update the number of likes
        this.numOfLikes = res.likes.number;

        // tell the control that the opinion has been unliked
        this.hasLiked = false;

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
