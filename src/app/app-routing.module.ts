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
// import { MoviesResolver } from './guards/movie.resolver';
import { ErrorComponent } from './pages/error/error.component';
import { SearchComponent } from './pages/search/search.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { WatchListComponent } from './pages/watch-list/watch-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'registration', component: RegisterComponent, canActivate: [MovieGuard], outlet: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [MovieGuard], outlet: 'login' },
  { path: 'favorites', component: FavoritesComponent, canActivate: [MovieGuard] },
  { path: 'watch-list', component: WatchListComponent, canActivate: [MovieGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'now-playing', component: NowPlayingComponent, canActivate: [MovieGuard] },
  { path: 'popular', component: PopularComponent, canActivate: [MovieGuard] },
  { path: 'top-rate', component: TopRateComponent, canActivate: [MovieGuard] },
  { path: 'upcoming', component: UpcomingComponent, canActivate: [MovieGuard] },
  { path: 'search', component: SearchComponent, canActivate: [MovieGuard] },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
