
// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';

//primeng
import { TooltipModule } from 'primeng/tooltip';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';

//pipes
import { TrasformTimeDuration } from './pipes/trasformTimeDuration.pipe';

//components
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

//pages
import { NowPlayingComponent } from './pages/now-playing/now-playing.component';
import { PopularComponent } from './pages/popular/popular.component';
import { TopRateComponent } from './pages/top-rate/top-rate.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';


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
    HomeComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule,
    AnimateOnScrollModule,
    FormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    CommonModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
