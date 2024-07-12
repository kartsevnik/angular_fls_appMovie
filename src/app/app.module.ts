import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { TrasformTimeDuration } from './pipes/trasformTimeDuration.pipe';
import { HeaderComponent } from './components/header/header.component';
import { TooltipModule } from 'primeng/tooltip';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NowPlayingComponent } from './components/now-playing/now-playing.component';
import { PopularComponent } from './components/popular/popular.component';
import { TopRateComponent } from './components/top-rate/top-rate.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieCardComponent,
    TrasformTimeDuration,
    HeaderComponent,
    NowPlayingComponent,
    PopularComponent,
    TopRateComponent,
    UpcomingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule,
    AnimateOnScrollModule,
    FormsModule,
    DropdownModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
