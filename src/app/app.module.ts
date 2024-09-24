
// core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';

//primeng
import { TooltipModule } from 'primeng/tooltip';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { CarouselModule } from 'primeng/carousel';

//pipes
import { TrasformTimeDuration } from './pipes/trasformTimeDuration.pipe';

//components
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

//pages
import { NowPlayingComponent } from './pages/now-playing/now-playing.component';
import { PopularComponent } from './pages/popular/popular.component';
import { TopRateComponent } from './pages/top-rate/top-rate.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';
import { SavedMoviesComponent } from './pages/saved-movies/saved-movies.component';
import { ErrorComponent } from './pages/error/error.component';

//store
import { StoreModule, MetaReducer, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { moviesReducer } from './store/reducer';
import { MoviesEffects } from './store/effects';
import { appReducers } from './store/state';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environments';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['movies'], rehydrate: true })(reducer);
}
export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

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
    SavedMoviesComponent,
    ErrorComponent
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
    ScrollingModule,
    HttpClientModule,
    CarouselModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot([MoviesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Хранить последние 25 состояний
      logOnly: environment.production, // В продакшене не разрешаем изменять состояние через DevTools
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
