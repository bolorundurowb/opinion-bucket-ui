import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})

export class TopicListComponent implements OnInit {
  isLoading: boolean

  constructor() {}

  ngOnInit(): void {
    this.isLoading = true;
  }
}
