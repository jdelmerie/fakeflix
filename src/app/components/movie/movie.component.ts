import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movie: Movie | undefined;
  error = null;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getMovie(id);
      }
    });
  }

  getMovie(id: string) {
    this.api.getMovieById(id).subscribe({
      next: (data) => console.log(data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
    console.log(this.movie);
  }
}
