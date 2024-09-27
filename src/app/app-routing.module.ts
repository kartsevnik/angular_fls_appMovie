import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieGuard } from './guards/movie.guard';
import { NowPlayingComponent } from './pages/now-playing/now-playing.component';
import { PopularComponent } from './pages/popular/popular.component';
import { TopRateComponent } from './pages/top-rate/top-rate.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';
import { HomeComponent } from './pages/home/home.component';
import { SavedMoviesComponent } from './pages/saved-movies/saved-movies.component';
// import { MoviesResolver } from './guards/movie.resolver';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'favorites', component: SavedMoviesComponent, canActivate: [MovieGuard] },
  { path: 'watch-list', component: SavedMoviesComponent, canActivate: [MovieGuard] },
  { path: 'home', component: HomeComponent},
  { path: 'now-playing', component: NowPlayingComponent, canActivate: [MovieGuard] },
  { path: 'popular', component: PopularComponent, canActivate: [MovieGuard] },
  { path: 'top-rate', component: TopRateComponent, canActivate: [MovieGuard] },
  { path: 'upcoming', component: UpcomingComponent, canActivate: [MovieGuard] },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
