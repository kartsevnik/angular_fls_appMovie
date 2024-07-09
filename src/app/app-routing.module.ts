import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieGuard } from './guards/movie.guard';

const routes: Routes = [
  { path: '', canActivate: [MovieGuard], component: MovieListComponent },
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
