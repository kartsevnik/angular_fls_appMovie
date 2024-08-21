import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieGuard } from './guards/movie.guard';
import { NowPlayingComponent } from './pages/now-playing/now-playing.component';
import { PopularComponent } from './pages/popular/popular.component';
import { TopRateComponent } from './pages/top-rate/top-rate.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';
import { HomeComponent } from './components/home/home.component';
import { SavedMoviesComponent } from './pages/saved-movies/saved-movies.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'movie-list/:category', component: MovieListComponent },
  { path: 'favorites', component: SavedMoviesComponent, canActivate: [MovieGuard] },
  { path: 'watch-list', component: SavedMoviesComponent, canActivate: [MovieGuard] },
  { path: 'now-playing', component: NowPlayingComponent, canActivate: [MovieGuard] },
  { path: 'all-movies', component: MovieListComponent }, 
  { path: 'popular', component: PopularComponent, canActivate: [MovieGuard] },
  { path: 'top-rate', component: TopRateComponent, canActivate: [MovieGuard] },
  { path: 'upcoming', component: UpcomingComponent, canActivate: [MovieGuard] },
];



// ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
