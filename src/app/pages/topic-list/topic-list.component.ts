import {Component, OnInit} from '@angular/core';
import {TopicsService} from '../../services/topics.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
  providers: [TopicsService]
})

export class TopicListComponent implements OnInit {
  isLoading: boolean;
  topics: Array<any>;
  hasError: boolean;
  errorMessage: string;

  // pagination data
  numOfTailors: number;
  maxSize = 5;

  constructor(private topicService: TopicsService) {}

  ngOnInit(): void {
    this.hasError = false;
    this.isLoading = true;

    this.topicService.getAll()
      .subscribe((res) => {
        this.isLoading = false;

        // display topics
        this.topics = res;
      }, (err) => {
        this.hasError = true;
        this.isLoading = false;

        // display the error message
        this.errorMessage = err.error.message || err.message;
      });
  }

  selectedPage(event): void {
    console.log(event);
  }
}
