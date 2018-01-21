import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss']
})
export class TopicDetailsComponent implements OnInit {
  topicId: string;

  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;

  constructor (
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.topicId = params.id;
    });

    this.isLoading = true;
  }
}
