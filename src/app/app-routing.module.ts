import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MovieComponent } from './components/movie/movie.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SeriesComponent } from './components/series/series.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, data: { link: 'home' } },
      { path: 'favorites', component: HomeComponent, data: { link: 'favorites' } },
      { path: 'watchlist', component: HomeComponent, data: { link: 'watchlist' } }
    ],
  },
  { path: 'series', component: SeriesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
