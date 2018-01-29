import {Component} from '@angular/core';
import {OpinionsService} from '../../services/opinions.service';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: [],
  providers: [OpinionsService]
})
export class OpinionsComponent {
  constructor(private opinionsService: OpinionsService) {
  }
}
