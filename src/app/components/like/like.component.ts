import {Component, Input, OnInit} from '@angular/core';
import {OpinionsService} from '../../services/opinions.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-like',
  templateUrl: 'like.component.html',
  styleUrls: ['like.component.scss'],
  providers: [OpinionsService, AuthService]
})
export class LikeComponent implements OnInit {
  // inputs
  @Input() topicId: string;
  @Input() opinionId: string;

  // variables
  userId: string;

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
    this.userId = this.authService.retrieveUser()._id;

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
      });
  }

  like(): void {
    //
  }

  unlike(): void {

  }
}
