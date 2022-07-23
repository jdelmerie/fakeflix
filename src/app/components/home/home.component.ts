import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  upcomings: Movie[] | undefined;
  movieResults: Movie[] | undefined;
  error = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getUpComings();
  }

  getUpComings() {
    this.api.getUpComings().subscribe({
      next: (data) => (this.upcomings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
    console.log(this.upcomings);
  }

  getMovies(value: string) {
    this.api.getMoviesBySearch(value).subscribe({
      next: (data) => (this.movieResults = data.results),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
}
