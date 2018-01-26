import {Component, Input} from '@angular/core';
import {OpinionsService} from '../../services/opinions.service';

@Component({
  selector: 'app-like',
  templateUrl: 'like.component.html',
  styleUrls: ['like.component.scss'],
  providers: [OpinionsService]
})
export class LikeComponent {
  // inputs
  @Input() topicId: string;
  @Input() opinionId: string;
  @Input() userId: string;

  // data models
  numOfLikes: number;
  isLiked: boolean;
  isEnabled: boolean;

  constructor(
    opinionsService: OpinionsService
  ) {}


}
