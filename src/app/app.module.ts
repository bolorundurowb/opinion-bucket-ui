// modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SuiModule} from 'ng2-semantic-ui';
// components
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {TopicListComponent} from './pages/topic-list/topic-list.component';
import {RouterModule, Routes} from '@angular/router';
import {TopicDetailsComponent} from './pages/topic-details/topic-details.component';
import {OpinionsComponent} from './components/opinions/opinions.component';
import {LikeComponent} from './components/like/like.component';
import {DislikeComponent} from './components/dislike/dislike.component';
// interceptors
import {JwtInterceptor} from './interceptors/JwtInterceptor';
import {ErrorInterceptor} from './interceptors/ErrorInterceptor';

const appRoutes: Routes = [
  {
    path: '',
    component: TopicListComponent
  },
  {
    path: 'topics/:id',
    component: TopicDetailsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopicListComponent,
    TopicDetailsComponent,
    OpinionsComponent,
    LikeComponent,
    DislikeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    SuiModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
