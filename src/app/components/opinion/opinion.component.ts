import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: []
})
export class OpinionComponent {
  // inputs
  @Input() opinion: any;

  // outputs
  @Output() errors = new EventEmitter<any>();

  // data models
  author: any;

  constructor() {
  }

  propagateError(err: any): void {
    this.errors.emit(err);
  }
}
