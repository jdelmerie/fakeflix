import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: any[] | undefined;
  error = null;
  noimage: string = '/assets/img/noimage.png'
  title: string = '';

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      switch (data['link']) {
        case 'home':
          this.getMovies("");
          break;
        case 'favorites':
          this.getFavs();
          break;
        case 'watchlist':
          this.getWL();
          break;
      }
    });
  }

  getMovies(value: string) {
    if (value) {
      this.api.getMoviesBySearch(value).subscribe({
        next: (data) => (this.movies = data.results, this.title = "Search results"),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    } else {
      this.api.getUpComings().subscribe({
        next: (data) => (this.movies = data.results, this.title = "Upcomings"),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    }
  }

  getFavs() {
    if (!this.isSessionIdExisting()) {
      this.router.navigateByUrl("/login")
    } else {
      this.api.getFavs().subscribe({
        next: (data) => (console.log(data), this.movies = data.results, this.title = "Your favorites"),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    }
  }

  getWL() {
    if (!this.isSessionIdExisting()) {
      this.router.navigateByUrl("/login")
    } else {
      this.api.getWL().subscribe({
        next: (data) => (console.log(data), this.movies = data.results, this.title = "Your watchlist"),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    }
  }

  goToMovie(id: number) {
    this.router.navigateByUrl('movie/' + id);
  }

  isSessionIdExisting(): boolean {
    return this.api.getSessionId() != null ? true : false;
  }
}
