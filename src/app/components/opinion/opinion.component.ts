import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: []
})
export class OpinionComponent {
  // inputs
  @Input opinion: any;

  // outputs
  @Output error = new EventEmitter<any>();

  constructor() {
  }
}
