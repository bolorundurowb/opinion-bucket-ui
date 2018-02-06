import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TopicsService} from '../../services/topics.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  providers: [TopicsService]
})
export class TopicDetailsComponent implements OnInit {
  topicId: string;

  // vars to control the views
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;

  // display data
  topic: any;
  showNewComment: boolean;

  constructor (
    private route: ActivatedRoute,
    private topicService: TopicsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.topicId = params.id;
    });

    this.isLoading = true;

    this.topicService.getById(this.topicId)
      .subscribe((res) => {
        // remove the loader
        this.isLoading = false;

        // bind data to display elements
        this.topic = res;
      }, (err) => {
        // remove the loader
        this.isLoading = false;

        // display the error message
        this.handleErrors(err);
      });
  }

  /**
   * Handles displaying errors
   * @param {any} err
   */
  handleErrors(err: any): void {
    if (err) {
      this.hasError = true;
      this.errorMessage = err.error.message || err.message;
    }
  }

  showNewCommentInterface(): void {
    this.showNewComment = true;
  }

  opinionEntryClosed(reloadOpinions: boolean): void {
    if (reloadOpinions) {
      this.isLoading = true;

      this.topicService.getById(this.topicId)
        .subscribe((res) => {
          // remove the loader
          this.isLoading = false;

          // bind data to display elements
          this.topic = res;
        }, (err) => {
          // remove the loader
          this.isLoading = false;

          // display the error message
          this.handleErrors(err);
        });
    }
    this.showNewComment = false;
  }
}
