import {Component, OnInit, ViewChild} from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';
import {IContext} from '../../interfaces/IContext';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;
  isLoggedIn: boolean;
  isLoading: boolean;
  errorMessage: string;

  constructor(private modalService: SuiModalService) { }

  ngOnInit() {
  }

  openLoginModal(): void {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    this.modalService
      .open(config);
  }

  login(): void {
    this.isLoading = true;
    this.errorMessage = 'jjwekleew';
  }
}
