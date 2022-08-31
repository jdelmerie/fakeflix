import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movie: any;
  error = null;
  noimage: string = '/assets/img/noimage.png';
  movieId: number = 0;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];
    if (this.movieId > 0) {
      this.api.getMovieById(this.movieId).subscribe({
        next: (data) => (this.movie = data, console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    }
  }

  fav() {
    if (!this.isSessionIdExisting()) {
      this.router.navigateByUrl("/login")
    } else {
      this.getAccountId();
      this.api.fav(this.movieId).subscribe({
        next: (data) => (console.log(data), alert("Movie added to favorites")),
        error: (err) => (this.error = err.message),
        complete: () => (this.router.navigateByUrl("/favorites")),
      });
    }
  }

  watchlist() {
    this.api.wl(this.movieId).subscribe({
      next: (data) => (console.log(data), alert("Movie added to your watchlist")),
      error: (err) => (this.error = err.message),
      complete: () => (this.router.navigateByUrl("/watchlist")),
    });
  }

  getAccountId() {
    this.api.getAccount().subscribe({
      next: (data) => (this.api.saveAccountId(data.id as string)),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  isSessionIdExisting(): boolean {
    return this.api.getSessionId() != null ? true : false;
  }

}
