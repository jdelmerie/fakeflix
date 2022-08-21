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
  noimage: string = '/assets/img/noimage.png'

  constructor(private route: ActivatedRoute, private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getMovie(id);
      }
    });

    if (this.isSessionIdExisting()) {
      console.log("auth ok")
    }

  }

  getMovie(id: string) {
    this.api.getMovieById(id).subscribe({
      next: (data) => (console.log(data), this.movie = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  fav() {

    console.log(this.isSessionIdExisting())


  }


  // sendRequestToken(token:string) {
  //   this.api.authenticationSession(token).subscribe({
  //     next: (data) => (console.log(data)),
  //     error: (err) => (this.error = err.message),
  //     complete: () => (this.error = null),
  //   });
  // }



  watchlist() {
    // this.api.test().subscribe({
    //   next: (data) => (console.log(data)),
    //   error: (err) => (this.error = err.message),
    //   complete: () => (this.error = null),
    // });
  }

  isSessionIdExisting(): boolean {
    // if (this.api.getSessionId() != null) {
    //   return true;
    // }
    // return false;

    return this.api.getSessionId() != null ? true : false;
  }

}
