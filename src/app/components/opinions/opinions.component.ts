import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OpinionsService} from '../../services/opinions.service';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: [],
  providers: [OpinionsService]
})
export class OpinionsComponent implements OnInit {
  // inputs
  @Input() topicId: string;

  // outputs
  @Output() errors = new EventEmitter<any>();

  // data models
  opinions: Array<any>;

  constructor(private opinionsService: OpinionsService) {
  }

  ngOnInit(): void {
    this.opinionsService.getAllOpinions(this.topicId)
      .subscribe((res) => {
        this.opinions = res;
      }, (err) => {
        this.errors.emit(err);
      });
  }
}
