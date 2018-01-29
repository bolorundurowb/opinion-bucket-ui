import {Component, Input} from '@angular/core';
import {OpinionsService} from '../../services/opinions.service';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: [],
  providers: [OpinionsService]
})
export class OpinionsComponent {
  // inputs
  @Input() topicId: string;

  // data models
  opinions: Array<any>;

  constructor(private opinionsService: OpinionsService) {
  }

}
