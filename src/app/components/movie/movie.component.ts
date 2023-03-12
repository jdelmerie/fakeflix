import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

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
  alertAdded: string = "Movie added to your ";
  alertDeleted: string = "Movie deleted from your ";

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {

    this.movieId = this.route.snapshot.params['id'];
    if (this.movieId > 0) {
      this.api.getFavs(1).subscribe(data => {
        if (this.checkFavOrWL(data.results, this.movieId)) {
          this.disabledFav = true;
        }
      });
      this.api.getWL(1).subscribe(data => {
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

  fav(listName: string = "favorites") {
    this.action(this.api.getFavs(1), listName, this.api.fav(this.movieId), this.alertSuccess(this.alertAdded + listName));
  }

  watchlist(listName: string = "watchlist") {
    this.action(this.api.getWL(1), listName, this.api.wl(this.movieId), this.alertSuccess(this.alertAdded + listName));
  }

  private action(apiLinkGetData: Observable<any>, listName: string, apiLink: Observable<any>, alert: any) {
    if (this.api.isSessionIdExisting()) {
      this.getAccountId();
      apiLinkGetData.subscribe(data => {
        if (this.checkFavOrWL(data.results, this.movieId)) {
          this.alertDeny(listName)
        } else {
          apiLink.subscribe({
            next: (data) => alert,
            error: (err) => (this.error = err.message),
            complete: () => (this.router.navigateByUrl(`/${listName}`)),
          });
        }
      })
    }
  }

  deleteFav(movieId: number, listName: string = "favorites") {
    this.delete(listName, movieId, this.api.unfav(movieId), this.disabledFav = false);
  }

  deleteWL(movieId: number, listName: string = "watchlist") {
    this.delete(listName, movieId, this.api.unwl(movieId), this.disabledWL = false);
  }

  private delete(listName: string, movieId: number, apiLink: Observable<any>, disabled: boolean) {
    if (this.api.isSessionIdExisting()) {
      this.getAccountId();
      this.confirmSuppression(`Do you really want to delete this movie from your ${listName} ?`).then((res) => {
        if (res.isConfirmed) {
          apiLink.subscribe({
            next: () => this.alertSuccess(this.alertDeleted + listName),
            error: (err) => this.error = err.message,
            complete: () => this.router.navigateByUrl('movie/' + movieId),
          });
        }
      })
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

  private confirmSuppression(title: string) {
    return Swal.fire({
      title: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete it !'
    })
  }

  private alertSuccess(title: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: title
    })
  }

  private alertDeny(listName: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'warning',
      title: `This movie is already in your ${listName}`
    })
  }

  ngOnDestroy(): void {
    this.disabledFav = false;
    this.disabledWL = true
  }
}
