import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieGuard } from './guards/movie.guard';
import { NowPlayingComponent } from './components/now-playing/now-playing.component';
import { PopularComponent } from './components/popular/popular.component';
import { TopRateComponent } from './components/top-rate/top-rate.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';

const routes: Routes = [
  { path: '', canActivate: [MovieGuard], component: MovieListComponent },
  { path: 'movie-list', canActivate: [MovieGuard], component: MovieListComponent },
  { path: 'now-playing', canActivate: [MovieGuard], component: NowPlayingComponent },
  { path: 'popular', canActivate: [MovieGuard], component: PopularComponent },
  { path: 'top-rate', canActivate: [MovieGuard], component: TopRateComponent },
  { path: 'upcoming', canActivate: [MovieGuard], component: UpcomingComponent },
  // { path: 'movie/:id', canActivate: [MovieGuard], component: MovieListViewComponent, resolve: {data: MovieResolver} },

];
// const routes: Routes = [
//   {path: "login", component: LoginComponent},
//   {path: "", component: DashboardComponent, canActivate: [AuthGuard] },


// ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
