import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: any;
  error = null;
  noimage: string = '/assets/img/noimage.png';
  movieId: number = 0;
  disabledFav: boolean = false;
  disabledWL: boolean = false;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];
    if (this.movieId > 0) {
      this.api.getFavs().subscribe(data => {
        if (this.checkFavOrWL(data.results, this.movieId)) {
          this.disabledFav = true;
        }
      });
      this.api.getWL().subscribe(data => {
        if (this.checkFavOrWL(data.results, this.movieId)) {
          this.disabledWL = true;
        }
      })
      this.api.getMovieById(this.movieId).subscribe({
        next: (data) => (this.movie = data),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    }
  }

  fav() {
    this.action(this.api.getFavs(), "favorites", this.api.fav(this.movieId));
  }

  watchlist() {
    this.action(this.api.getWL(), "watchlist", this.api.wl(this.movieId));
  }

  private action(apiLinkGetData: Observable<any>, listName: string, apiLink: Observable<any>) {
    if (this.api.isSessionIdExisting()) {
      this.getAccountId();
      apiLinkGetData.subscribe(data => {
        if (this.checkFavOrWL(data.results, this.movieId)) {
          alert(`This movie is already in your ${listName}`);
        } else {
          apiLink.subscribe({
            next: (data) => alert(`Movie added to ${listName}`),
            error: (err) => (this.error = err.message),
            complete: () => (this.router.navigateByUrl(`/${listName}`)),
          });
        }
      })
    }
  }

  deleteFav(movieId: number) {
    this.delete("favorites", movieId, this.api.unfav(movieId), this.disabledFav = false);
  }

  deleteWL(movieId: number) {
    this.delete("watchlist", movieId, this.api.unwl(movieId), this.disabledWL = false);
  }

  private delete(listName: string, movieId: number, apiLink: Observable<any>, disabled: boolean) {
    if (this.api.isSessionIdExisting()) {
      this.getAccountId();
      if (confirm(`Do you really want to delete this movie from your ${listName} ?`)) {
        apiLink.subscribe({
          next: () => (alert(`Movie deleted from ${listName}`)),
          error: (err) => this.error = err.message,
          complete: () => this.router.navigateByUrl('movie/' + movieId),
        });
      }
    }
  }

  private getAccountId() {
    this.api.getAccount().subscribe({
      next: (data) => (this.api.saveAccountId(data.id as string)),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  private checkFavOrWL(datas: any, movieId: number) {
    return datas.filter((item: any) => item.id == movieId).length === 1 ? true : false;
  }

  ngOnDestroy(): void {
    this.disabledFav = false;
    this.disabledWL = true
  }
}
