import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  upcomings: any[] | undefined;
  movieResults: any[] | undefined;
  error = null;
  noimage: string = '/assets/img/noimage.png'

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUpComings();
    
  }

  getUpComings() {
    this.api.getUpComings().subscribe({
      next: (data) => (this.upcomings = data, console.log(this.upcomings)),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  getMovies(value: string) {
    this.api.getMoviesBySearch(value).subscribe({
      next: (data) => (this.movieResults = data.results),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }


  goToMovie(id: number) {
    this.router.navigateByUrl('movie/' + id);
  }
}
