import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getMovies('');
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
        next: (data) => (this.movies = data.results, this.title = "Upcomings", console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    }
  }

  goToMovie(id: number) {
    this.router.navigateByUrl('movie/' + id);
  }
}
