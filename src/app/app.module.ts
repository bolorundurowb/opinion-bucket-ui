// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {TopicListComponent} from './pages/topic-list/topic-list.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    component: TopicListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopicListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
