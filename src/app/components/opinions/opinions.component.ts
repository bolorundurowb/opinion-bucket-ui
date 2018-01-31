import {Component, Input, OnInit} from '@angular/core';
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

  // data models
  opinions: Array<any>;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;

  constructor(private opinionsService: OpinionsService) {
  }

  ngOnInit(): void {
    // set the loading ui
    this.isLoading = true;

    this.opinionsService.getAllOpinions(this.topicId)
      .subscribe((res) => {
        // stop the loading ui
        this.isLoading = false;

        // bind the retrieved data
        this.opinions = res;
      }, (err) => {
        // stop the loading ui
        this.isLoading = false;

        // show error pane
        this.hasError = true;

        // display the error
        this.errorMessage = err.error.message || err.message;
      });
  }
}
