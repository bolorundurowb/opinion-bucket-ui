import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TopicsService} from '../../services/topics.service';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
  providers: [TopicsService, CategoriesService]
})

export class TopicListComponent implements OnInit {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;

  // topic data
  allTopics: Array<any> = [];
  topicsToDisplay: Array<any> = [];

  // pagination data
  numOfTopics: number;
  maxSize = 5;
  pageSize = 10;

  // category data
  categories: Array<any> = [];

  constructor(private topicService: TopicsService, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.hasError = false;
    this.isLoading = true;

    // retrieve topics
    this.topicService.getAll()
      .subscribe((res) => {
        this.isLoading = false;

        // display topics
        this.allTopics = res;
        this.topicsToDisplay = this.allTopics.slice(0, this.pageSize);

        // set the topics length
        this.numOfTopics = res.length;
      }, (err) => {
        this.hasError = true;
        this.isLoading = false;

        // display the error message
        this.errorMessage = err.error.message || err.message;
      });

    // retrieve the categories
    this.categoriesService.getAll()
      .subscribe((res) => {
        this.categories = res;

        // add the 'all' option
        this.categories.unshift({ _id: '', title: 'All' })
      });
  }

  filterChanged(event) {
    // make api call
    this.topicService.getByCategories(event)
      .subscribe((res) => {
        // display topics
        this.allTopics = res;
        this.topicsToDisplay = this.allTopics.slice(0, this.pageSize);
      }, (err) => {
        this.hasError = true;
        this.isLoading = false;

        // display the error message
        this.errorMessage = err.error.message || err.message;
      });
  }

  selectedPage(event): void {
    const index = (event - 1) * this.pageSize;

    // set the new data to be displayed
    this.topicsToDisplay = this.allTopics.slice(index, index + this.pageSize);
  }
}
